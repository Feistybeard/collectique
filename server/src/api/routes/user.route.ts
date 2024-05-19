import express from "express";
import UserController from "../controllers/user.controller";
import validateMiddleware from "../middlewares/validate.middleware";
import { userLoginSchema, userRegisterSchema } from "../schemas/user.schemas";

const UserRouter = express.Router();

UserRouter.post(
  "/register",
  validateMiddleware(userRegisterSchema),
  UserController.register
);

UserRouter.post(
  "/login",
  validateMiddleware(userLoginSchema),
  UserController.login
);

export default UserRouter;
