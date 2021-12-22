const {
  CustomError,
  errorLogger,
  generateSizeInteger,
} = require('../../../helpers');

const { createStripeCustomer } = require('../../../integrations');

const {
  getOneCompany,
  getOneUserLite,
  transformCompany: transformCompanyQuery,
} = require('../../../db');
const {
  transformCompanyError,
  transformCompanySuccess,
} = require('./constants');
const { uploadImage } = require('../../../middlewares/imageUpload');

const transformCompany = async ({ companyInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);
    const {
      companyId,
      description,
      location,
      logo,
      name,
      size,
      website,
    } = companyInput;
    const { email, firstName, lastName } = await getOneUserLite({ userId });

    const companyData = {
      company_name: name,
      company_url: website,
      description,
      id: companyId,
      location,
      modified_date: new Date(),
      size: generateSizeInteger({ size }),
    };

    // Upload image if logo is returned
    if (logo && logo !== 'null') {
      const protocol = logo.substring(0, 5);

      if (protocol !== 'https') {
        const { uploadUrl } = await uploadImage(logo);
        companyData.logo = uploadUrl;
      }
    } else {
      companyData.logo = undefined;
    }

    // Create Stripe customer
    const { customerId } = await getOneCompany({ companyId });
    if (!customerId) {
      const { id: stripeId } = await createStripeCustomer({
        companyId,
        email,
        location,
        name,
        url: website,
        user: `${firstName} ${lastName}`,
        userId,
      });
      companyData.customer_id = stripeId;
    }

    await transformCompanyQuery({ ...companyData });

    return {
      __typename: 'Success',
      message: transformCompanySuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || transformCompanyError,
    };
  }
};

module.exports = transformCompany;
