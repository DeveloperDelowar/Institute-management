import { addNewUserToDB } from './user.services';
import controllerHelper from '../../shared/controllerHelper';
import { Request, Response } from 'express';
import sendResponse from '../../shared/sendResponse';
import { TUser } from './user.interface';

export const createNewUser = controllerHelper(
  async (req: Request, res: Response) => {
    const userInf = req.body;
    const result = await addNewUserToDB(userInf);

    sendResponse<TUser>(res, {
      message: 'User create successfully',
      data: result,
    });
  },
);
