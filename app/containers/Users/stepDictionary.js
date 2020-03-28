import ManualUser from './Add/ManualUser';
import VerifyUser from './Add/VerifyUser';
import EditExisting from './Edit/EditExisting';
import VerifyExisting from './Edit/VerifyExisting';

export const addUserDictionary = {
  1: ManualUser,
  2: VerifyUser,
};

export const editUserDictionary = {
  1: EditExisting,
  2: VerifyExisting,
};
