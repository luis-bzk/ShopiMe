import type { NextApiRequest, NextApiResponse } from "next";

import { isValidObjectId } from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import { db } from "../../../database";
import { Product } from "../../../models";
import { IProduct, IProductFormData } from "../../../interfaces";

cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data = { message: string } | Array<IProduct> | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "POST":
      return createProduct(req, res);
    case "PUT":
      return updateProduct(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({ title: "asc" }).lean();
  await db.disconnect();

  // TODO: Actualizar imágenes

  // ! IMAGES LOCALHOST
  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `${process.env.HOST_NAME}products/${image}`;
    });
    return product;
  });

  res.status(200).json(updatedProducts);
};

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id = "", images = [] } = req.body as IProductFormData;
  console.log({ body: req.body });

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "Id del producto invalido" });
  }

  if (images.length < 2) {
    return res.status(400).json({ message: "Es necesario al menos 2 imágenes" });
  }

  // TODO: posiblemente tendremos un localhost:3000/products/as.jpg

  try {
    await db.connect();
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(400).json({ message: "Producto no encontrado" });
    }

    // eliminar fotos en Cloudinary || Amazon s3 Bucket
    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        // borrar de cloudinary
        const [fileId, extension] = image.substring(image.lastIndexOf("/") + 1).split(".");
        console.log({ image, fileId, extension });

        await cloudinary.uploader.destroy(fileId);
      }
    });

    await product.update(req.body);
    await db.disconnect();

    //  ! IMAGES LOCALHOST
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `${process.env.HOST_NAME}products/${image}`;
    });

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar consola del servidor" });
  }
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { images = [], slug } = req.body as IProductFormData;

  if (images.length < 2) {
    return res.status(400).json({ message: "El producto necesita al menos 2 imágenes" });
  }

  // TODO: posiblemente tendremos un localhost:3000/products/as.jpg

  try {
    await db.connect();
    const productInDB = await Product.findOne({ slug }).lean();
    if (productInDB) {
      await db.disconnect();
      return res.status(400).json({ message: "Ya existe un producto con ese slug" });
    }
    const product = new Product(req.body);
    product.save();
    await db.disconnect();

    //  ! IMAGES LOCALHOST
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `${process.env.HOST_NAME}products/${image}`;
    });

    return res.status(201).json(product);
  } catch (error) {
    await db.disconnect();
    return res.status(400).json({ message: "Revisar mensajes del servidor" });
  }
};
