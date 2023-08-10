import { Request, Response } from 'express';
import { createAcademicSemister } from './academicSemister.services';
import controllerHelper from '../../shared/controllerHelper';
import sendResponse from '../../shared/sendResponse';

export const createAcademicSemisterCTRL = controllerHelper(
  async (req: Request, res: Response) => {
    const semisterData = req.body;
    const result = await createAcademicSemister(semisterData);

    sendResponse(res, {
      message: 'Semister created successfully.',
      data: result,
    });
  },
);
