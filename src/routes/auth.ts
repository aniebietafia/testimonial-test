// src/routes/user.ts
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRoute = Router();
const authController = new AuthController();

authRoute.post("/users", authController.signup.bind(authController));
authRoute.post("/login", authController.login.bind(authController));

export default authRoute;
