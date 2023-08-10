import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const zodRequestValidate = (sechema: AnyZodObject) => {
  const handler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await sechema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      return next();
    } catch (error) {
      next(error);
    }
  };

  return handler;
};

export default zodRequestValidate;
