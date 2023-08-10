import { NextFunction, Request, RequestHandler, Response } from 'express';

const controllerHelper = (fn: RequestHandler) => {
  const controller = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

  return controller;
};

export default controllerHelper;
