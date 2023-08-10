import { TUser } from './user.interface';
import { generateUserId } from './user.utils';
import config from '../../config/config';
import Users from './user.model';
import ApiError from '../../errors/ApiErrors';
import { StatusCodes } from 'http-status-codes';

// add new user to db
export const addNewUserToDB = async (user: TUser): Promise<TUser | null> => {
  // auto generated id
  const id = await generateUserId();
  user.id = id;

  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await Users.create(user);

  if (!createdUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user.');
  }

  return createdUser;
};
