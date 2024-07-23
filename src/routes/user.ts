import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middleware/authMiddleware";
import { multerConfig } from "../config/multer";

const upload = multerConfig.single("avatarUrl");

const userRoute = Router();
const userController = new UserController();

userRoute.put(
  "/users/:id",
  authMiddleware,
  upload,
  userController.updateUserProfile.bind(userController)
);
userRoute.get(
  "/users/:id",
  authMiddleware,
  userController.getUserById.bind(userController)
);

export default userRoute;
