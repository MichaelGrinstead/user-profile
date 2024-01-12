import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { JWT } from "../types";

const secret = process.env.JWT_SECRET || "secret";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).send({ message: "Unauthorized no token" });
    return;
  }

  jwt.verify(
    token,
    secret,
    (err: VerifyErrors | null, decoded: Object | undefined) => {
      if (err) {
        res.status(401).send({ message: "Unauthorized token error" });
        return;
      }

      if (decoded) {
        req.body.id = (decoded as JWT).id;
        next();
      } else {
        res.status(401).send({ message: "Token no longer valid" });
      }
    }
  );

  return;
}
