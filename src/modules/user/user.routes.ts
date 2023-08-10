import express from 'express';
import { createNewUser } from './user.controller';
import zodRequestValidate from '../../middlewares/zodRequestValidation';
import createUserZodSchema from './user.zodValidation';

const router = express.Router();

router.post(
  '/create-new-user',
  zodRequestValidate(createUserZodSchema),
  createNewUser,
);

const userRoutes = router;
export default userRoutes;
