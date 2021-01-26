import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ResetPasswordFailure from './ResetPasswordFailure';
import ResetPasswordSuccess from './ResetPasswordSuccess';

export const passwordResetDictionary = {
  1: ForgotPassword,
  2: ResetPassword,
  3: ResetPasswordSuccess,
  4: ResetPasswordFailure,
};
