import ApiError from '../../errors/ApiErrors';
import { semisterTitleAndCodeMapping } from './academicSemister.constant';
import { TAcademicSemister } from './academicSemister.interface';
import AcademicSemisterModel from './academicSemister.model';
import { StatusCodes } from 'http-status-codes';

export const createAcademicSemister = async (
  data: TAcademicSemister,
): Promise<TAcademicSemister> => {
  // Check academic semister title and code
  if (semisterTitleAndCodeMapping[data.title] !== data.code) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'invalid semister code.');
  }

  const result = await AcademicSemisterModel.create(data);

  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create semister.');
  }

  return result;
};
