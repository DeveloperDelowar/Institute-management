import express, { Router } from 'express';
import AcademicSemisterRouter from '../modules/academicSemister/academicSemister.routes';
import userRoutes from '../modules/user/user.routes';

const router = express.Router();

type routerType = {
  path: string;
  route: Router;
};

const routes: routerType[] = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/academic-semister',
    route: AcademicSemisterRouter,
  },
];

routes.forEach(route => router.use(route?.path, route?.route));

export default router;
