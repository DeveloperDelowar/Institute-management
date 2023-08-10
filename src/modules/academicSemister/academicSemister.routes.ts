import express from 'express';
import zodRequestValidate from '../../middlewares/zodRequestValidation';
import academicSemisterZodSchema from './academicSemister.zodSchema';
import { createAcademicSemisterCTRL } from './academicSemister.controller';
const router = express.Router();

router.post(
  '/create',
  zodRequestValidate(academicSemisterZodSchema),
  createAcademicSemisterCTRL,
);

const AcademicSemisterRouter = router;
export default AcademicSemisterRouter;
