import z from "zod";

const createUser = z.object({
  first_name: z.string().min(3).max(50),
  last_name: z.string().min(3).max(50).optional(),
  email: z.email(),
  password: z.string().min(8).max(36),
});

const loginUser = z.object({
  email: z.string().min(8).max(36),
  password: z.string().min(8).max(36),
});
const verifyOtp = z.object({
  otp: z.string().min(6).max(6),
  email: z.email(),
});
export const AuthValidation = {
  createUser,
  loginUser,
  verifyOtp,
};
