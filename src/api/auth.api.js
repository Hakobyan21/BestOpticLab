// NPM Modules
import express from "express";

import AuthController from "../auth/auth.controller";
import { AuthValidationMiddleware } from "../middlewares/validation";

const router = express.Router();

router.post(
  "/login",
  AuthValidationMiddleware.validateLoginArgs,
  AuthController.login
);
router.post(
  "/loginTasks",
//   AuthValidationMiddleware.validateLoginArgs,
  AuthController.loginTasks
);

router.post("/refresh", AuthController.refresh);

router.post("/google/login", AuthController.googleLogin);

router.post("/fedex", AuthController.fedexAuth);

export default router;
