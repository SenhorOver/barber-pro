import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization as string;

  if (!authToken) {
    return res.status(401).end();
  }

  try {
    const [, token] = authToken.split(" ");

    const { sub } = verify(
      token as string,
      process.env.JWT_SECRET as string,
    ) as Payload;

    req.user_id = sub;

    return next();
  } catch {
    return res.status(401).end();
  }
}
