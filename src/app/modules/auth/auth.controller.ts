import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.createUser(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User created successfully!",
      data: result,
    });
  },
);

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.loginUser(
      req.body.email,
      req.body.password,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully!",
      data: result,
    });
  },
);
export const AuthController = {
  createUser,
  loginUser,
};
