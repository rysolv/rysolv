import React from 'react';
import T from 'prop-types';

import AsyncRender from 'components/AsyncRender';
import { EditPosition as EditPositionView } from 'components/CompanyPosition';

const EditPosition = ({
  companyPositionQuestions,
  fetchQuestionsLoading,
  ...restProps
}) => (
  <AsyncRender
    asyncData={companyPositionQuestions}
    component={EditPositionView}
    error={false}
    isRequiredData
    loading={fetchQuestionsLoading}
    propsToPassDown={{ companyPositionQuestions, ...restProps }}
  />
);

EditPosition.propTypes = {
  companyPositionQuestions: T.array.isRequired,
  fetchQuestionsLoading: T.bool.isRequired,
};

export default EditPosition;
