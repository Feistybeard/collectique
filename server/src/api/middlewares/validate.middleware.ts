import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import createHttpError from "http-errors";

function validateMiddleware(schema: ZodType<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const errorMessages = (error as ZodError).errors.map(
        (err) => err.message
      );
      throw createHttpError.BadRequest(errorMessages.join(", "));
      // res.status(400).json({ success: false, errors: errorMessages });
    }
  };
}

export default validateMiddleware;
