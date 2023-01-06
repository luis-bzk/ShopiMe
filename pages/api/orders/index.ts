import type { NextApiRequest, NextApiResponse } from "next";
import { IOrder } from "../../../interfaces/order";
import { getSession } from "next-auth/react";
import { db } from "../../../database";
import { Order, Product } from "../../../models";
import { IProduct } from "../../../interfaces";

type Data = { message: string } | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "POST":
      return createNewOrder(req, res);
    default:
      return res.status(400).json({ message: "Bad Request" });
  }
}
const createNewOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, totalCost } = req.body as IOrder;

  // verificar usuarios
  const session: any = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Debe de estar autenticado para crear una orden" });
  }

  // crear arreglo con productos deseados
  const productsId = orderItems.map((product) => product._id);

  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsId } }).lean();

  try {
    const subTotal = orderItems.reduce((total, cartItem) => {
      const dbProductPrice = dbProducts.find((product) => product._id.toString() === cartItem._id.toString())?.price;
      if (!dbProductPrice) {
        throw new Error("Verifique los productos de su carrito");
      }

      return total + cartItem.quantity * dbProductPrice;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    // const backCalcTaxRate = subTotal * taxRate;
    // const backendCalcTotalCost = subTotal + backCalcTaxRate;
    const backendCalcTotalCost = subTotal * (taxRate + 1);
    if (totalCost !== backendCalcTotalCost) {
      throw new Error("El total no coincide con los productos solicitados");
    }

    const userId = session.user._id;
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    newOrder.totalCost = Math.round(newOrder.totalCost * 100) / 100;
    await newOrder.save();
    await db.disconnect();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({ message: error.message || "Review server logs" });
  }

  return res.status(201).json({} as any);
};
