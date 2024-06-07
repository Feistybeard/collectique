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
      return next(createHttpError.BadRequest(errorMessages.join(", ")));
    }
  };
}

export default validateMiddleware;
