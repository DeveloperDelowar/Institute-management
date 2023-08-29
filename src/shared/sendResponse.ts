import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

type ApiResponseType<T> = {
  success?: boolean;
  statusCode?: number;
  message: string;
  data: T | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
};

const sendResponse = <T>(res: Response, data: ApiResponseType<T>): void => {
  const resInfo = {
    message: data?.message,
    data: data?.data || null,
    meta: data?.meta || null,
    success: data?.success || true,
    statusCode: data?.statusCode || StatusCodes.OK,
  };

  res.status(data?.statusCode || StatusCodes.OK).json(resInfo);
};

export default sendResponse;
