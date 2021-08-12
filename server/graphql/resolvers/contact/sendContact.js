const { errorLogger, sendEmail } = require('../../../helpers');

const sendContact = async ({ contactInput }) => {
  const { body, email, source } = contactInput;

  try {
    await sendEmail({
      body: { body, email, source },
      path: '/s/contact/contact',
    });

    return {
      __typename: 'Success',
      message: 'Email delivered',
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
