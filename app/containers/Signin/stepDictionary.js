import PasswordReset from './PasswordReset';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Verify from './Verify';

export const passwordResetComponent = PasswordReset;

export const signInDictionary = {
  1: SignIn,
  2: Verify,
};

export const signUpDictionary = {
  1: SignUp,
  2: Verify,
};
