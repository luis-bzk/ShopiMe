import { db } from ".";
import { User } from "../models";
import bcrypt from "bcryptjs";

export const checkUserEmailPassword = async (email: string, password: string) => {
  await db.connect();
  const user = await User.findOne({ email: email }).lean();
  await db.disconnect();

  if (!user) {
    return null;
  }
  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { name, role, _id } = user;

  return {
    id: _id,
    _id,
    email: email.toLowerCase(),
    role,
    name,
  };
};

// Crear  verificar usuario mediante OAuth
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });
  await db.disconnect();

  if (user) {
    await db.disconnect();
    const { _id, name, email, role } = user;
    return { _id, name, email, role };
  }
  const newUser = new User({ email: oAuthEmail, name: oAuthName, password: "@", role: "client" });
  try {
    await newUser.save();
    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    console.log(error);
  }

  const { _id, name, email, role } = newUser;
  return { _id, name, email, role };
};
