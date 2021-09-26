import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import Calendly from 'components/Calendly';
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
  InternalLink,
} from './styledComponents';

const HeaderImageLeft = iconDictionary('headerImageLeft');
const RecruitmentHeaderImageRight = iconDictionary(
  'recruitmentHeaderImageRight',
);

const CompanyRecruitment = ({
  dispatchChangeInput,
  dispatchChangeStep,
  dispatchResetForm,
  error,
  form,
  formErrors,
  handleSendContact,
  handleValidateInput,
  loading,
  step,
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
          <CompanyRecruitmentSubheader>
            See how we{' '}
            <InternalLink label="score candidates" path="/how-we-score-code" />.
          </CompanyRecruitmentSubheader>
        </HeaderGroup>
        <HeaderGroup>
          <CompanyRecruitmentHeader>
            Only pay for placement
          </CompanyRecruitmentHeader>
          <CompanyRecruitmentSubheader>
            We&apos;re confident we&apos;ll find the right engineers for the
            job. You only pay 5% starting salary at time of hire, and 5% after
            60 days.
          </CompanyRecruitmentSubheader>
        </HeaderGroup>
      </HeaderWrapper>
      <ConditionalRender
        Component={<Calendly isCompanyRecruitment />}
        FallbackComponent={
          <FormWrapper>
            <RecruitmentForm
              dispatchChangeInput={dispatchChangeInput}
              dispatchChangeStep={dispatchChangeStep}
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
        }
        shouldRender={step === 2}
      />
    </CompanyRecruitmentContainer>
    <HeaderImageRightIcon>{RecruitmentHeaderImageRight}</HeaderImageRightIcon>
    <HeaderImageLeftIcon>{HeaderImageLeft}</HeaderImageLeftIcon>
  </Fragment>
);

CompanyRecruitment.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeStep: T.func.isRequired,
  dispatchResetForm: T.func.isRequired,
  error: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleSendContact: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  loading: T.bool.isRequired,
  step: T.number.isRequired,
  success: T.bool.isRequired,
};

export default CompanyRecruitment;
