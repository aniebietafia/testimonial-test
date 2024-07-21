// src/routes/user.ts
import { Router } from "express";
import UserController from "../controllers/UserController";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/users", userController.registerUser.bind(userController));
userRouter.post("/login", userController.loginUser.bind(userController));

export default userRouter;
