import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

type ApiResponseType<T> = {
  success?: boolean;
  message: string;
  data?: T | null;
  statusCode?: number;
};

const sendResponse = <T>(res: Response, data: ApiResponseType<T>): void => {
  const resInfo = {
    message: data?.message,
    data: data?.data || null,
    success: data?.success || true,
    statusCode: data?.statusCode || StatusCodes.OK,
  };

  res.status(data?.statusCode || StatusCodes.OK).json(resInfo);
};

export default sendResponse;
