import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidation.createUser),
  AuthController.createUser,
);
router.post(
  "/login",
  validateRequest(AuthValidation.loginUser),
  AuthController.loginUser,
);
export const AuthRouter = router;
