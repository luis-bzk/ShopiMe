import { isValidObjectId } from "mongoose";
import { IOrder } from "../interfaces";
import { db } from ".";
import { Order } from "../models";

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await db.connect();
  const order = await Order.findById(id).lean();
  await db.disconnect();

  if (!order) {
    return null;
  }

  return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUserId = async (userId: string): Promise<Array<IOrder>> => {
  if (!isValidObjectId(userId)) {
    return [];
  }

  await db.connect();
  const orders = await Order.find({ user: userId }).select("shippingAddress isPaid createdAt updatedAt").lean();
  // const orders = await Order.find().where("user").equals(userId);
  await db.disconnect();

  if (!orders) {
    return [];
  }

  return JSON.parse(JSON.stringify(orders));
};
