import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import Calendly from 'components/Calendly';

import PricingGrid from './PricingGrid';
import RecruitmentForm from './RecruitmentForm';
import {
  CompanyRecruitmentContainer,
  CompanyRecruitmentHeader,
  FormWrapper,
} from './styledComponents';

const CompanyRecruitment = ({
  deviceView,
  dispatchChangeInput,
  dispatchChangeStep,
  dispatchResetForm,
  error,
  form,
  formErrors,
  handleSelectPlan,
  handleSendContact,
  handleValidateInput,
  loading,
  step,
  success,
}) => (
  <Fragment>
    <CompanyRecruitmentContainer>
      <CompanyRecruitmentHeader> Pricing!</CompanyRecruitmentHeader>
      <PricingGrid
        buttonText="Get Started"
        deviceView={deviceView}
        focus
        handleSelectPlan={handleSelectPlan}
      />
      <CompanyRecruitmentHeader> Talk to us!</CompanyRecruitmentHeader>
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
  </Fragment>
);

CompanyRecruitment.propTypes = {
  deviceView: T.string.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeStep: T.func.isRequired,
  dispatchResetForm: T.func.isRequired,
  error: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleSelectPlan: T.func.isRequired,
  handleSendContact: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  loading: T.bool.isRequired,
  step: T.number.isRequired,
  success: T.bool.isRequired,
};

export default CompanyRecruitment;
