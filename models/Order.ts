import mongoose, { Schema, model, Model } from "mongoose";
import { IOrder } from "../interfaces";
import { IOrderItem } from "../interfaces/order";

type orderModel = Model<IOrder, {}>;

const orderSchema = new Schema<IOrder, orderModel>(
  {
    // name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        title: { type: String, required: true },
        size: {
          type: String,
          enum: {
            values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
            message: "{VALUE} no es un tamaño permitido",
          },
          required: true,
        },
        quantity: { type: Number, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        gender: {
          type: String,
          enum: {
            values: ["men", "women", "kid", "unisex"],
            message: "{VALUE} no es un tamaño permitido",
          },
          required: true,
        },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      lastname: { type: String, required: true },
      address: { type: String, required: true },
      address2: { type: String },
      zipcode: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },

    paymentResult: { type: String },
    quantityProducts: { type: Number, required: true },
    subtotalCost: { type: Number, required: true },
    taxRateCost: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: String },
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.models.Order || model("Order", orderSchema);

export default Order;
