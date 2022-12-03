import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "../../database";
// import { IProduct } from "../../interfaces";
import { Product } from "../../models";

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "No tienes acceso para este servicio" });
  }

  // connect db
  await db.connect();

  // clean previous data
  await Product.deleteMany();

  // insert data
  await Product.insertMany(seedData.initialData.products);

  await db.disconnect();

  res.status(200).json({ message: "Los datos se insertaron correctamente" });
}
