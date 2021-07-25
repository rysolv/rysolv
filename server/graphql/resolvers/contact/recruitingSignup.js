const { createRecruiting } = require('../../../db');
const { errorLogger, sendEmail } = require('../../../helpers');

const recruitingSignup = async ({ contactInput }) => {
  const { companyName, companyUrl, contactName, email } = contactInput;

  try {
    await createRecruiting({ companyName, companyUrl, contactName, email });

    await sendEmail({
      body: { companyName, companyUrl, contactName, email },
      path: '/s/contact/recruiting',
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

module.exports = recruitingSignup;
