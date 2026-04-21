import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { prisma } from "../../config/prisma";
import ApiError from "../../errors/ApiError";

const createUser = async (user: any) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  });
  return newUser;
};
const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Credentials");
  return user;
};
export const AuthService = {
  createUser,
  loginUser,
};
