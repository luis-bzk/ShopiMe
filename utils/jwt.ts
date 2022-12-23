import jwt from "jsonwebtoken";

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("NO SEMILLA JWT - ENV");
  }

  return jwt.sign({ _id, email }, process.env.JWT_SECRET_SEED, { expiresIn: "7d" });
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("NO SEMILLA JWT - ENV");
  }

  if (token.length <= 10) {
    return Promise.reject("jwt invalido");
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || "", (error, payload) => {
        if (error) return reject("JWT no es valido");
        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (error) {
      console.log(error);
      reject("JWT no es valido");
    }
  });
};
