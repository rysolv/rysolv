export const ACCEPT_BOUNTY = 'app/Settings/ACCEPT_BOUNTY';
export const ACCEPT_BOUNTY_FAILURE = 'app/Settings/ACCEPT_BOUNTY_FAILURE';
export const ACCEPT_BOUNTY_SUCCESS = 'app/Settings/ACCEPT_BOUNTY_SUCCESS';

export const CHANGE_EMAIL = 'app/Settings/CHANGE_EMAIL';
export const CHANGE_EMAIL_FAILURE = 'app/Settings/CHANGE_EMAIL_FAILURE';
export const CHANGE_EMAIL_SUCCESS = 'app/Settings/CHANGE_EMAIL_SUCCESS';

export const CHANGE_SKILL_LEVEL = 'app/Settings/CHANGE_SKILL_LEVEL';

export const CLEAR_ALERTS = 'app/Settings/CLEAR_ALERTS';

export const CLEAR_ERRORS = 'app/Settings/CLEAR_ERRORS';

export const CLOSE_MODAL_STATE = 'app/Settings/CLOSE_MODAL_STATE';

export const DELETE_SKILL = 'app/Settings/DELETE_SKILL';

export const DELETE_USER = 'app/Settings/DELETE_USER';
export const DELETE_USER_FAILURE = 'app/Settings/DELETE_USER_FAILURE';
export const DELETE_USER_SUCCESS = 'app/Settings/DELETE_USER_SUCCESS';

export const FETCH_INFO = 'app/Settings/FETCH_INFO';
export const FETCH_INFO_FAILURE = 'app/Settings/FETCH_INFO_FAILURE';
export const FETCH_INFO_SUCCESS = 'app/Settings/FETCH_INFO_SUCCESS';

export const FETCH_QUESTIONS = 'app/Settings/FETCH_QUESTIONS';
export const FETCH_QUESTIONS_FAILURE = 'app/Settings/FETCH_QUESTIONS_FAILURE';
export const FETCH_QUESTIONS_SUCCESS = 'app/Settings/FETCH_QUESTIONS_SUCCESS';

export const FETCH_USER_RESPONSE = 'app/Settings/FETCH_USER_RESPONSE';
export const FETCH_USER_RESPONSE_FAILURE =
  'app/Settings/FETCH_USER_RESPONSE_FAILURE';
export const FETCH_USER_RESPONSE_SUCCESS =
  'app/Settings/FETCH_USER_RESPONSE_SUCCESS';

export const INPUT_CHANGE = 'app/Settings/INPUT_CHANGE';

export const INPUT_ERROR = 'app/Settings/INPUT_ERROR';

export const OPEN_MODAL_STATE = 'app/Settings/OPEN_MODAL_STATE';

export const PAYPAL_PAYMENT = 'app/Settings/PAYPAL_PAYMENT';
export const PAYPAL_PAYMENT_FAILURE = 'app/Settings/PAYPAL_PAYMENT_FAILURE';
export const PAYPAL_PAYMENT_SUCCESS = 'app/Settings/PAYPAL_PAYMENT_SUCCESS';

export const REMOVE_ATTEMPTING = 'app/Settings/REMOVE_ATTEMPTING';
export const REMOVE_ISSUE_FAILURE = 'app/Settings/REMOVE_ISSUE_FAILURE';
export const REMOVE_ISSUE_SUCCESS = 'app/Settings/REMOVE_ISSUE_SUCCESS';
export const REMOVE_WATCHING = 'app/Settings/REMOVE_WATCHING';

export const RESET_FORM_STATE = 'app/Settings/RESET_FORM_STATE';

export const RESET_STATE = 'app/Settings/RESET_STATE';

export const SAVE_CHANGE = 'app/Settings/SAVE_CHANGE';
export const SAVE_CHANGE_FAILURE = 'app/Settings/SAVE_CHANGE_FAILURE';
export const SAVE_CHANGE_SUCCESS = 'app/Settings/SAVE_CHANGE_SUCCESS';

export const STRIPE_TOKEN = 'app/Settings/STRIPE_TOKEN';
export const STRIPE_TOKEN_FAILURE = 'app/Settings/STRIPE_TOKEN_FAILURE';
export const STRIPE_TOKEN_SUCCESS = 'app/Settings/STRIPE_TOKEN_SUCCESS';

export const UPDATE_USER_SKILLS = 'app/Settings/UPDATE_USER_SKILLS';
export const UPDATE_USER_SKILLS_FAILURE =
  'app/Settings/UPDATE_USER_SKILLS_FAILURE';
export const UPDATE_USER_SKILLS_SUCCESS =
  'app/Settings/UPDATE_USER_SKILLS_SUCCESS';

export const VERIFY_ACCOUNT = 'app/Settings/VERIFY_ACCOUNT';
export const VERIFY_ACCOUNT_FAILURE = 'app/Settings/VERIFY_ACCOUNT_FAILURE';
export const VERIFY_ACCOUNT_SUCCESS = 'app/Settings/VERIFY_ACCOUNT_SUCCESS';

export const WITHDRAW_FUNDS = 'app/Settings/WITHDRAW_FUNDS';
export const WITHDRAW_FUNDS_FAILURE = 'app/Settings/WITHDRAW_FUNDS_FAILURE';
export const WITHDRAW_FUNDS_SUCCESS = 'app/Settings/WITHDRAW_FUNDS_SUCCESS';

export const actionDictionary = {
  Commented: 'commented on',
  Earned: 'earned a bounty',
  Funded: 'funded',
  Submitted: 'opened pull request',
};

export const changeEmailError = `Something went wrong when changing your email.`;

export const settingViewDictionary = {
  attempting: 0,
  watching: 0,
  account: 1,
  deposit: 1,
  withdrawal: 1,
  bounties: 2,
  issues: 3,
  repos: 4,
  pullrequests: 5,
};

export const verifyUserAccountError = `Something went wrong when verifying your Github account.`;
