import React from 'react';
import T from 'prop-types';

import AsyncRender from 'components/AsyncRender';
import { EditCompany as EditCompanyView } from 'components/CompanySignUp';

const EditCompany = ({
  companyQuestions,
  fetchQuestionsLoading,
  ...restProps
}) => (
  <AsyncRender
    asyncData={companyQuestions}
    component={EditCompanyView}
    isRequiredData
    loading={fetchQuestionsLoading}
    propsToPassDown={{ companyQuestions, ...restProps }}
  />
);

EditCompany.propTypes = {
  companyQuestions: T.array.isRequired,
  fetchQuestionsLoading: T.bool.isRequired,
};

export default EditCompany;
