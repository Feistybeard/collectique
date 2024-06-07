import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

const errorHandler = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(error.status).json({
    success: false,
    message: error.message || "Something went wrong, try again later.",
  });
};

export default errorHandler;
