const { errorLogger, sendEmail } = require('../../../helpers');

const sendContact = async ({ body, email, source }) => {
  try {
    await sendEmail({
      body: { body, email, source },
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
