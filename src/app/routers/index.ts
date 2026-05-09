import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { userRouter } from "../modules/user/user.route";

const router = Router();
const moduleRouters = [
  {
    path: "/auth",
    router: AuthRouter,
  },
  {
    path: "/user",
    router: userRouter,
  },
];
moduleRouters.forEach((route) => router.use(route.path, route.router));
export default router;
