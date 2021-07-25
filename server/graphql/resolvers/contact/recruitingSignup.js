const { createRecruiting } = require('../../../db');
const { errorLogger, sendEmail } = require('../../../helpers');

const recruitingSignup = async ({ contactInput }) => {
  const { companyName, companyUrl, contactName, email, source } = contactInput;

  try {
    await createRecruiting({ companyName, companyUrl, contactName, email });

    await sendEmail({
      body: { email, source },
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
