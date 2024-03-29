import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct } from "../../../interfaces";
import { Product } from "../../../models";

type Data = { message: string } | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getProductBySlug(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }

  res.status(200).json({ message: "Example" });
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ message: "Es necesario el slug" });
  }

  await db.connect();
  // const product = await Product.find().where("slug").equals(slug).lean();
  const product = await Product.findOne({ slug: slug }).lean();
  await db.disconnect();

  if (!product) {
    return res.status(404).json({ message: "No se ha encontrado ningún producto" });
  }

  //  ! IMAGES LOCALHOST
  product.images = product.images.map((image) => {
    return image.includes("http") ? image : `${process.env.HOST_NAME}products/${image}`;
  });

  // return JSON.parse(JSON.stringify(product));

  return res.status(200).json(product);
};
