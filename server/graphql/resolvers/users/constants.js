const acceptBountyFailure = `Something went wrong when accepting this bounty.`;

const acceptBountySuccess = `Bounty has successfully been accepted.`;

const createUserError = `Something went wrong when signing you up.`;

const deletedUserImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBvwAcytGFLkWO2eT-FCwE5z_mlQxBdI9uwbyeczCTVBci7Vrg&usqp=CAU';

const deleteUserError = `Something went wrong when deleting your account.`;

const deleteUserSuccess = `Your account has been successfully deleted.`;

const getUsersError = `Something went wrong when getting users.`;

const getUserSettingsError = `Something went wrong when getting your account information.`;

const githubNotVerifiedError = 'This account has not been linked with Github.';

const githubSignInError = `Something went wrong when signing you in through Github.`;

const githubSignUpError = `Something went wrong when signing you up through Github.`;

const oneUserError = `Something went wrong when getting this user.`;

const remainingBalanceError = `Your account cannot be deleted with an outstanding balance.`;

const resendCodeError = `Something went wrong when resending your verification code. Please try again later.`;

const resendCodeSuccess = ({ email }) =>
  `An email with a verification code has been sent to ${email}.`;

const resetPasswordError = `Something went wrong when resetting your password.`;

const resetPasswordSuccess = `Your password has been successfully reset.`;

const sendLinkError = `Something went wrong when sending a verification code to your email address.`;

const sendLinkSuccess = `A verification code has been sent to your email address.`;

const signInError = `Something went wrong when signing you in. Please try again later.`;

const signOutError = `Something went wrong when signing you out.`;

const signOutSuccess = 'You have been successfully signed out.';

const transformUserError = `Something went wrong when updating your account.`;

const transformUserSuccess = `Your account has been successfully updated.`;

const verifyUserAccountError = `Something went wrong when verifying your Github account.`;

const verifyUserAccountSuccess = `Your Github account has been successfully verified.`;

const verifyUserEmailError = `Something went wrong when verifying your email.`;

const verifyUserEmailSuccess = `Your email has been successfully verified.`;

module.exports = {
  acceptBountyFailure,
  acceptBountySuccess,
  createUserError,
  deletedUserImage,
  deleteUserError,
  deleteUserSuccess,
  getUsersError,
  getUserSettingsError,
  githubNotVerifiedError,
  githubSignInError,
  githubSignUpError,
  oneUserError,
  remainingBalanceError,
  resendCodeError,
  resendCodeSuccess,
  resetPasswordError,
  resetPasswordSuccess,
  sendLinkError,
  sendLinkSuccess,
  signInError,
  signOutError,
  signOutSuccess,
  transformUserError,
  transformUserSuccess,
  verifyUserAccountError,
  verifyUserAccountSuccess,
  verifyUserEmailError,
  verifyUserEmailSuccess,
};
