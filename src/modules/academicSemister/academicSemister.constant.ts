import {
  IAcademicSemesterTitles,
  IAcademicSemisterCode,
  Month,
} from './academicSemister.interface';

export const academicSemisterMonths: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemisterTitle: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemisterCode: IAcademicSemisterCode[] = ['01', '02', '03'];

export const semisterTitleAndCodeMapping = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const AcademicSemisterSearchableFileds = ['title', 'code', 'year'];

export const AcademicSemisterSemisterSearchableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];
