import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "./prisma";

export const validateToken = (token: string) => jwt.verify(token, "secrethash");

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (token) {
      let user;

      try {
        const { id } = validateToken(token);
        user = await prisma.user.findUnique({ where: { id } });
        if (!user) throw new Error("User does not exist");
      } catch (error) {
        res.status(401).json({ error: "Not Authorized" });
        return;
      }

      return handler(req, res, user);
    }

    res.status(401).json({ error: "Not Authorized" });
  };
};
