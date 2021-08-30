import React, { useEffect } from 'react';
import T from 'prop-types';

import { ProgressButton } from 'components/base_ui';

import {
  ButtonWrapper,
  Input,
  InputError,
  InputLabel,
  InputWrapper,
  RecruitmentFormContainer,
} from './styledComponents';

const RecruitmentForm = ({
  dispatchChangeInput,
  dispatchChangeStep,
  dispatchResetForm,
  error,
  form,
  formErrors: {
    company: companyError,
    email: emailError,
    name: nameError,
    url: urlError,
  },
  handleSendContact,
  handleValidateInput,
  loading,
  success,
}) => {
  const { company, email, name, url } = form;

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        if (success) dispatchChangeStep({ step: 2 });
      }, 300);
      setTimeout(() => {
        dispatchResetForm();
      }, 6000);
    }
  }, [error, success]);

  return (
    <RecruitmentFormContainer>
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
        <InputLabel>Company name</InputLabel>
        <Input
          autoComplete="organization"
          height="4.9rem"
          onBlur={() => handleValidateInput({ field: 'company', values: form })}
          onChange={e =>
            dispatchChangeInput({ field: 'company', value: e.target.value })
          }
          placeholder="Company name"
          type="text"
          value={company}
        />
        <InputError>{companyError}</InputError>
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Company website</InputLabel>
        <Input
          autoComplete="url"
          height="4.9rem"
          onBlur={() => handleValidateInput({ field: 'url', values: form })}
          onChange={e =>
            dispatchChangeInput({ field: 'url', value: e.target.value })
          }
          placeholder="Company website"
          type="url"
          value={url}
        />
        <InputError>{urlError}</InputError>
      </InputWrapper>
      <ButtonWrapper>
        <ProgressButton
          disabled={
            company.length === 0 ||
            email.length === 0 ||
            name.length === 0 ||
            url.length === 0
          }
          error={error}
          label="Next"
          loading={loading}
          onClick={() => handleSendContact({ company, email, name, url })}
          success={success}
        />
      </ButtonWrapper>
    </RecruitmentFormContainer>
  );
};

RecruitmentForm.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeStep: T.func.isRequired,
  dispatchResetForm: T.func.isRequired,
  error: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleSendContact: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  loading: T.bool.isRequired,
  success: T.bool.isRequired,
};

export default RecruitmentForm;
