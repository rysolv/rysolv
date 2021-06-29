const { errorLogger, sendEmail } = require('../../../helpers');

const sendContact = async ({ email, body, source }) => {
  try {
    await sendEmail({
      body: { email, body, source },
      path: '/s/contact/contact',
    });
    return {
      __typename: 'Success',
      message: 'Email deliverd',
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: 'Delivery failed',
    };
  }
};

module.exports = sendContact;
