import React, { useEffect } from 'react';
import T from 'prop-types';

import { ProgressButton } from 'components/base_ui';

import {
  ButtonWrapper,
  ContactUsFormContainer,
  Input,
  InputError,
  InputLabel,
  InputWrapper,
  Textarea,
} from './styledComponents';

const ContactUsForm = ({
  dispatchChangeInput,
  dispatchResetForm,
  error,
  form,
  formErrors: { body: bodyError, email: emailError, name: nameError },
  handleSendContact,
  handleValidateInput,
  loading,
  success,
}) => {
  const { body, email, name } = form;

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        dispatchResetForm();
      }, 6000);
    }
  }, [error, success]);

  return (
    <ContactUsFormContainer>
      <InputWrapper>
        <InputLabel>Contact name</InputLabel>
        <Input
          autoComplete="name"
          height="4.9rem"
          onBlur={() => handleValidateInput({ field: 'name', values: form })}
          onChange={e =>
            dispatchChangeInput({ field: 'name', value: e.target.value })
          }
          placeholder="Contact name"
          type="text"
          value={name}
        />
        <InputError>{nameError}</InputError>
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Email</InputLabel>
        <Input
          autoComplete="email"
          height="4.9rem"
          onBlur={() => handleValidateInput({ field: 'email', values: form })}
          onChange={e =>
            dispatchChangeInput({ field: 'email', value: e.target.value })
          }
          placeholder="Email"
          type="email"
          value={email}
        />
        <InputError>{emailError}</InputError>
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Description</InputLabel>
        <Textarea
          height="14.4rem"
          onBlur={() => handleValidateInput({ field: 'body', values: form })}
          onChange={e =>
            dispatchChangeInput({ field: 'body', value: e.target.value })
          }
          placeholder="Description"
          type="text"
          value={body}
        />
        <InputError>{bodyError}</InputError>
      </InputWrapper>
      <ButtonWrapper>
        <ProgressButton
          disabled={
            body.length === 0 || email.length === 0 || name.length === 0
          }
          error={error}
          label="Next"
          loading={loading}
          onClick={() => handleSendContact({ body, email, name })}
          success={success}
        />
      </ButtonWrapper>
    </ContactUsFormContainer>
  );
};

ContactUsForm.propTypes = {
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

export default ContactUsForm;
