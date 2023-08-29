import { SortOrder } from 'mongoose';
import { PaginationType } from '../interfaces/paginationType';

// export const makePaginationOption = <T extends object>(data: T) => {
//   const keys = ['page', 'limit', 'sortBy', 'sortOrder'];
//   const paginationInfo: Partial<T> = {};

//   for (const key of keys) {
//     if (data.hasOwnProperty.call(data, key)) {
//       if (key === 'page' || key === 'limit') {
//         const parseData: number = Number(data[key as keyof T]);
//         paginationInfo[key as 'page' | 'limit'] = parseData;
//       } else {
//         paginationInfo[key as keyof T] = data[key as keyof T];
//       }
//     }
//   }

//   return paginationInfo;
// };

type PaginationOptionType = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const makePaginationOption = <T extends object>(data: T) => {
  const keys = ['page', 'limit', 'sortBy', 'sortOrder'];
  const paginationInfo: Partial<T> = {};

  for (const key of keys) {
    if (data.hasOwnProperty.call(data, key)) {
      paginationInfo[key as keyof T] = data[key as keyof T];
    }
  }

  return calculatePagination(paginationInfo);
};

const calculatePagination = (
  option: Partial<PaginationOptionType>,
): PaginationType => {
  const page = Number(option?.page || 1);
  const limit = Number(option?.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = option?.sortBy || 'createdAt';
  const sortOrder = option?.sortOrder || 'desc';
  const sort: { [key: string]: SortOrder } = {};
  sort[sortBy] = sortOrder;

  return {
    page,
    limit,
    skip,
    sort,
  };
};

export default makePaginationOption;
