import type { NextApiRequest, NextApiResponse } from "next";
import { Order, Product, User } from "../../../models";
import { db } from "../../../database";
import { IDashboardData } from "../../../interfaces";

type Data = { message: string } | IDashboardData;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getAdminData(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getAdminData = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  db.connect();

  const [numberOfOrders, paidOrders, numberOfClients, numberOfProducts, productsWithNoInventory, lowInventory] =
    await Promise.all([
      Order.count(),
      Order.find({ isPaid: true }).count(),
      User.find({ role: "client" }).count(),
      Product.count(),
      Product.find({ inStock: 0 }).count(),
      Product.find({ inStock: { $lte: 10 } }).count(),
    ]);
  db.disconnect();

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  });
};
