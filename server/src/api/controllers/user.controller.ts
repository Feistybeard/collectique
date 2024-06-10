import { Request, Response, NextFunction } from "express";
import UserSchema from "../models/user.model";
import createHttpError from "http-errors";

const UserController = {
  register: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body;

      const user = await UserSchema.findOne({ email });

      if (user) {
        return res.status(200).json({
          success: false,
          message: "User already exists",
        });
      }

      const userModel = new UserSchema({
        email,
        password,
        role,
      });

      await userModel.hashPassword();

      const newUser = await userModel.save();
      if (!newUser) {
        return next(createHttpError.NotFound("User registration failed"));
      }

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    } catch (error) {
      return next(error);
    }
  },
  login: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await UserSchema.findOne({
        email,
      });
      if (!user) {
        console.log("User not found");
        return next(createHttpError.NotFound("User not found"));
      }

      const isPasswordValid = await user.verifyPassword(password);
      if (!isPasswordValid) {
        console.log("isPasswordValid", isPasswordValid);
        return next(createHttpError.Unauthorized("Invalid password"));
      }

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default UserController;
