import express from 'express';
import zodRequestValidate from '../../middlewares/zodRequestValidation';
import academicSemisterZodSchema from './academicSemister.zodSchema';
import {
  createAcademicSemisterCTRL,
  getAcademicSemesterCTRL,
} from './academicSemister.controller';
const router = express.Router();

router.post(
  '/create',
  zodRequestValidate(academicSemisterZodSchema),
  createAcademicSemisterCTRL,
);

router.get('/', getAcademicSemesterCTRL);

const AcademicSemisterRouter = router;
export default AcademicSemisterRouter;
