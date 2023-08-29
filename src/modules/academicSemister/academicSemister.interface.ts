import { Model } from 'mongoose';

export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';

export type IAcademicSemisterCode = '01' | '02' | '03';

export type TAcademicSemister = {
  title: IAcademicSemesterTitles;
  year: string;
  code: IAcademicSemisterCode;
  startMonth: Month;
  endMonth: Month;
};

export type AcademicSemisterModel = Model<TAcademicSemister, object>;

export type IAcademicSemisterFilters = {
  searchTerm?: string;
};
