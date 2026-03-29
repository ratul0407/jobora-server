import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.route";

const router = Router();
const moduleRouters = [
  {
    path: "/auth",
    router: AuthRouter,
  },
];
moduleRouters.forEach((route) => router.use(route.path, route.router));
export default router;
