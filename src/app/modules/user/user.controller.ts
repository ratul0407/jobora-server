import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const userExists = req.user;
  if (userExists) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User fetched successfully",
      data: userExists,
    });
  }
  //   const user = await UserService.getUser(req.params.id as string);
};

export const UserController = {
  getUser,
};
