import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { prisma } from "../../config/prisma";
import ApiError from "../../errors/ApiError";
import { addEmailJob, emailQueue } from "../../queues/sendEmail.queue";
import crypto from "crypto";
import { redisClient } from "../../config/redis.config";
const OTP_EXPIRATION = 5 * 60;
const generateOTP = (length = 6) => {
  const otp = crypto.randomInt(10 ** (length - 1), 1000000);
  return otp;
};
const createUser = async (user: {
  password: string;
  first_name: string;
  email: string;
  last_name?: string;
}) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  });
  const redisKey = `user:${newUser.id}`;
  const otp = generateOTP();
  await redisClient.set(redisKey, otp, "EX", OTP_EXPIRATION);
  await addEmailJob(
    {
      to: newUser.email,
      subject: "Welcome to Jobora",
      templateName: "verifyOtp",
      templateData: { name: newUser.first_name, otp },
    },
    "sendEmail",
  );
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
const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!id) throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  return user;
};
const verifyOtp = async (email: string, otp: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  const redisKey = `user:${user.id}`;
  const savedOtp = await redisClient.get(redisKey);
  if (!savedOtp)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "OTP Expired & doesn't exist anymore",
    );
  if (String(savedOtp) !== String(otp)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "OTP doesn't match");
  }
  if (String(savedOtp) === String(otp)) {
    await redisClient.del(redisKey);
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        isVerified: true,
      },
    });
    return user;
  }
};
export const AuthService = {
  createUser,
  loginUser,
  getUser,
  verifyOtp,
};
