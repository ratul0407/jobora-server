import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { createJwtToken } from "../../utils/createJwtToken";
import config from "../../config";
import { setAuthCookie } from "../../utils/setCookie";
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
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
    const accessToken = createJwtToken(
      { email: result.email },
      config.jwt.access_secret,
      config.jwt.access_expires_in,
    );

    const refreshToken = createJwtToken(
      { email: result.email },
      config.jwt.refresh_secret,
      config.jwt.refresh_expires_in,
    );
    const tokenData = {
      accessToken,
      refreshToken,
    };

    setAuthCookie(res, tokenData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully!",
      data: result,
    });
  },
);
const verifyOtp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.verifyOtp(req.body.email, req.body.otp);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OTP verified successfully!",
      data: result,
    });
  },
);
export const AuthController = {
  createUser,
  loginUser,
  verifyOtp,
};
