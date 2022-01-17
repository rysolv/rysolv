import React, { Fragment } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import ContactUsForm from './ContactUsForm';
import {
  ContactUsContainer,
  ContactUsHeader,
  ContactUsSubheader,
  FormWrapper,
  HeaderGroup,
  HeaderImageRightIcon,
  HeaderWrapper,
} from './styledComponents';

const HeaderImageRight = iconDictionary('recruitmentHeaderImageRight');

const ContactUs = ({
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
    <ContactUsContainer>
      <HeaderWrapper>
        <HeaderGroup>
          <ContactUsHeader>How can we help?</ContactUsHeader>
          <ContactUsSubheader>
            Don&apos;t hesitate to contact us if we can help with anything.
          </ContactUsSubheader>
          <ContactUsSubheader>
            We&apos;d love to hear from you.
          </ContactUsSubheader>
        </HeaderGroup>
      </HeaderWrapper>
      <FormWrapper>
        <ContactUsForm
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
    </ContactUsContainer>
    <HeaderImageRightIcon>{HeaderImageRight}</HeaderImageRightIcon>
  </Fragment>
);

ContactUs.propTypes = {
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

export default ContactUs;
