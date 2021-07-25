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
  dispatchChangeInput,
  dispatchResetForm,
  error,
  form,
  formErrors,
  handleSendContact,
  handleValidateInput,
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
          dispatchChangeInput={dispatchChangeInput}
          dispatchResetForm={dispatchResetForm}
          error={error}
          form={form}
          formErrors={formErrors}
          handleSendContact={handleSendContact}
          handleValidateInput={handleValidateInput}
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
  dispatchChangeInput: T.func.isRequired,
  dispatchResetForm: T.func.isRequired,
  error: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleSendContact: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  loading: T.bool.isRequired,
  success: T.bool.isRequired,
};

export default CompanyRecruitment;
