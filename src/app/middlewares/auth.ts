import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../errors/ApiError";
import { verifyJwtToken } from "../utils/verifyJwtToken";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../config/prisma";
export const auth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    try {
      if (!accessToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Access Token not found");
      }
      const verifiedToken = (await verifyJwtToken(
        accessToken,
        config.jwt.access_secret,
      )) as JwtPayload;
      const userExists = await prisma.user.findUnique({
        where: {
          email: verifiedToken.email,
        },
      });
      if (!userExists) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
      }
      req.user = userExists;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
