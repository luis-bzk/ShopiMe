import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import { db } from "../../../database";
import { User } from "../../../models";
import { jwt, validations } from "../../../utils";

type Data = { message: string } | { token: string; user: { email: string; role: string; name: string } };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "POST":
      return registerUser(req, res);
    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { name = "", email = "", password = "" } = req.body as { name: string; email: string; password: string };

  if (password.length < 6) {
    return res.status(400).json({ message: "La contraseña debe tener mas de 6 caracteres" });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: "El nombre debe tener mas de 3 caracteres" });
  }

  // TODO: validar email
  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: "El correo no es valido" });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({ message: "Correo ya registrado" });
  }

  const newUser = new User({
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    name: name,
    role: "client",
  });

  try {
    await newUser.save({ validateBeforeSave: true });
    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({ message: "Review server" });
  }

  // await db.disconnect();

  const { _id, role } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({ token, user: { email, role, name } });
};
