import ApiError from '../../errors/ApiErrors';
import { PaginationApiResType } from '../../interfaces/paginationApiResponse';
import { PaginationType } from '../../interfaces/paginationType';
import {
  AcademicSemisterSearchableFileds,
  semisterTitleAndCodeMapping,
} from './academicSemister.constant';
import {
  IAcademicSemisterFilters,
  TAcademicSemister,
} from './academicSemister.interface';
import AcademicSemisterModel from './academicSemister.model';
import { StatusCodes } from 'http-status-codes';

// create academic semester;
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

// get academic semester
export const getAcademicSemister = async (
  filters: IAcademicSemisterFilters,
  pagination: PaginationType,
): Promise<PaginationApiResType<TAcademicSemister[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const condition = [];

  if (searchTerm) {
    condition.push({
      $or: AcademicSemisterSearchableFileds.map(filed => ({
        [filed]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    condition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition = condition.length > 0 ? { $and: condition } : {};
  const { page, limit, skip, sort } = pagination;

  const result = await AcademicSemisterModel.find(whereCondition)
    .sort(sort)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemisterModel.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
