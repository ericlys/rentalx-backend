import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Bearer token -> headers, authorization

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "78e5b0f92fcb174b9ea58300b0402286"
    ) as IPayload;

    const usersRespository = new UsersRepository();
    const user = usersRespository.findById(user_id);

    if (!user) {
      throw new Error("User does not exists!");
    }
    next();
  } catch {
    throw new Error("Invalid token!");
  }
}
