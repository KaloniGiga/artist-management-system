import UserModel from "@server/users/model/user.model";
import { Request } from "express";

export interface TokenPayload {
  userId: number;
}

export interface RequestWithUser extends Request {
  user: UserModel;
}
