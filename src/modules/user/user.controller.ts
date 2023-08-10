import { addNewUserToDB } from './user.services';
import controllerHelper from '../../shared/controllerHelper';
import { Request, Response } from 'express';
import sendResponse from '../../shared/sendResponse';

export const createNewUser = controllerHelper(
  async (req: Request, res: Response) => {
    const userInf = req.body;
    const result = await addNewUserToDB(userInf);

    sendResponse(res, {
      message: 'User create successfully',
      data: result,
    });
  },
);
