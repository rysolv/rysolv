import React, { Fragment } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import RecruitmentForm from './RecruitmentForm';
import {
  CompanyRecruitmentContainer,
  CompanyRecruitmentHeader,
  CompanyRecruitmentSubheader,
  FormWrapper,
  HeaderGroup,
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
        <HeaderGroup>
          <CompanyRecruitmentHeader>
            Join the future of hiring
          </CompanyRecruitmentHeader>
          <CompanyRecruitmentSubheader>
            Forget the algorithm tests! Rysolv evaluates a candidate&apos;s
            coding history to find the right engineer for the job.
          </CompanyRecruitmentSubheader>
          <CompanyRecruitmentSubheader removeOnMobile>
            We prioritize attributes that really matter to a team.
          </CompanyRecruitmentSubheader>
        </HeaderGroup>
        <HeaderGroup>
          <CompanyRecruitmentHeader>
            Only pay for placement
          </CompanyRecruitmentHeader>
          <CompanyRecruitmentSubheader>
            We&apos;re confident we&apos;ll find the right engineers for the
            job. You only pay 2.5% at time of hire, and 2.5% after 60 days.
          </CompanyRecruitmentSubheader>
        </HeaderGroup>
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
