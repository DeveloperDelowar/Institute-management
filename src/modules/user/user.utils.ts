import Users from './user.model';

// Find last user id
const findLastUserId = async () => {
  const last_user = await Users.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return last_user?.id;
};

// generate user id
export const generateUserId = async () => {
  const current_id = (await findLastUserId()) || '0';
  const convert_id = parseInt(current_id) + 1;
  const create_new_id = convert_id.toString().padStart(5, '0');

  return create_new_id;
};
