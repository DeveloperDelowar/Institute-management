import { Schema, model } from 'mongoose';
import {
  TAcademicSemister,
  AcademicSemisterModel,
} from './academicSemister.interface';
import {
  academicSemisterCode,
  academicSemisterMonths,
  academicSemisterTitle,
} from './academicSemister.constant';
import ApiError from '../../errors/ApiErrors';
import { StatusCodes } from 'http-status-codes';

const academicSemisterSchema = new Schema<TAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemisterTitle,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemisterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonths,
    },
  },
  {
    timestamps: true,
  },
);

// is exist
academicSemisterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemisterModel.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'The semister already exist !');
  }

  next();
});

const AcademicSemisterModel = model<TAcademicSemister, AcademicSemisterModel>(
  'Academic semister',
  academicSemisterSchema,
);

export default AcademicSemisterModel;
