import mongoose, { Schema, model, Model } from "mongoose";
import { IProduct } from "../interfaces";

type productModel = Model<IProduct, {}>;

const productSchema = new Schema<IProduct, productModel>(
  {
    description: {
      type: String,
      require: true,
    },
    images: [{ type: String }],
    inStock: {
      type: Number,
      require: true,
      default: 0,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    sizes: [
      {
        type: String,
        enum: {
          values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
          message: "{VALUE} no es un tamaño permitido",
        },
      },
    ],
    slug: {
      type: String,
      require: true,
      unique: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    title: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      enum: {
        values: ["shirts", "pants", "hoodies", "hats"],
        message: "{VALUE} no es un tipo permitido",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["men", "women", "kid", "unisex"],
        message: "{VALUE} no es un genero permitido",
      },
    },
  },
  { timestamps: true }
);

// TODO: crear indice de Mongo
productSchema.index({ title: "text", tags: "text" });

const Product: Model<IProduct> = mongoose.models.Product || model<IProduct, productModel>("Product", productSchema);

export default Product;
