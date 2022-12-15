import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import { jwt } from "../../../utils";
import { db } from "../../../database";
import { User } from "../../../models";

type Data = { message: string } | { token: string; user: { email: string; role: string; name: string } };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return checkJWT(req, res);
    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = "" } = req.cookies;

  let userId = "";

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Token de autorización invalido" });
  }

  await db.connect();
  const user = await User.findById(userId).lean();
  await db.disconnect();

  if (!user) {
    return res.status(400).json({ message: "Verificación del usuario incorrecta" });
  }
  const { _id, email, role, name } = user;

  const newToken = jwt.signToken(_id, email);

  return res.status(200).json({ token: newToken, user: { email, role, name } });
};
