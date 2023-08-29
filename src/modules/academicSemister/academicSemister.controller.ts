import { Request, Response } from 'express';
import {
  createAcademicSemister,
  getAcademicSemister,
} from './academicSemister.services';
import controllerHelper from '../../shared/controllerHelper';
import sendResponse from '../../shared/sendResponse';
import { TAcademicSemister } from './academicSemister.interface';
import makePaginationOption from '../../shared/paginationHelpers';
import { PaginationType } from '../../interfaces/paginationType';
import pick from './../../shared/pick';
import { AcademicSemisterSemisterSearchableFields } from './academicSemister.constant';

// create academic semister
export const createAcademicSemisterCTRL = controllerHelper(
  async (req: Request, res: Response) => {
    const semisterData = req.body;
    const result = await createAcademicSemister(semisterData);

    sendResponse<TAcademicSemister>(res, {
      message: 'Semister created successfully.',
      data: result,
    });
  },
);

// get academic semister
export const getAcademicSemesterCTRL = controllerHelper(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, AcademicSemisterSemisterSearchableFields);
    const paginationInfo: PaginationType = makePaginationOption(req.query);
    const result = await getAcademicSemister(filters, paginationInfo);

    sendResponse<TAcademicSemister[]>(res, {
      message: 'Academic semester informations.',
      data: result?.data,
      meta: result?.meta,
    });
  },
);
