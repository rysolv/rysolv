import React, { Fragment } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import RecruitmentForm from './RecruitmentForm';
import {
  CompanyRecruitmentContainer,
  CompanyRecruitmentHeader,
  CompanyRecruitmentSubheader,
  FormWrapper,
  HeaderImageLeftIcon,
  HeaderImageRightIcon,
  HeaderWrapper,
} from './styledComponents';

const HeaderImageLeft = iconDictionary('headerImageLeft');
const RecruitmentHeaderImageRight = iconDictionary(
  'recruitmentHeaderImageRight',
);

const CompanyRecruitment = ({
  dispatchResetForm,
  dispatchSendForm,
  error,
  loading,
  success,
}) => (
  <Fragment>
    <CompanyRecruitmentContainer>
      <HeaderWrapper>
        <CompanyRecruitmentHeader>
          Lorem ipsum dolor sit amet?
        </CompanyRecruitmentHeader>
        <CompanyRecruitmentSubheader>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </CompanyRecruitmentSubheader>
      </HeaderWrapper>
      <FormWrapper>
        <RecruitmentForm
          dispatchResetForm={dispatchResetForm}
          dispatchSendForm={dispatchSendForm}
          error={error}
          loading={loading}
          success={success}
        />
      </FormWrapper>
    </CompanyRecruitmentContainer>
    <HeaderImageRightIcon>{RecruitmentHeaderImageRight}</HeaderImageRightIcon>
    <HeaderImageLeftIcon>{HeaderImageLeft}</HeaderImageLeftIcon>
  </Fragment>
);

CompanyRecruitment.propTypes = {
  dispatchResetForm: T.func,
  dispatchSendForm: T.func,
  error: T.bool,
  loading: T.bool,
  success: T.bool,
};

export default CompanyRecruitment;
