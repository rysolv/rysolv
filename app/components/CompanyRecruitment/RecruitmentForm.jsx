import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { ProgressButton } from 'components/base_ui';

import {
  ButtonWrapper,
  Input,
  InputLabel,
  InputWrapper,
  RecruitmentFormContainer,
} from './styledComponents';

const RecruitmentForm = ({
  dispatchResetFeedback,
  dispatchSendContact,
  error,
  loading,
  success,
}) => {
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        dispatchResetFeedback();
        setCompany('');
        setEmail('');
        setName('');
        setUrl('');
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
          onChange={e => setName(e.target.value)}
          placeholder="Contact name"
          type="text"
          value={name}
        />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Email</InputLabel>
        <Input
          autoComplete="email"
          height="4.9rem"
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          value={email}
        />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Company name</InputLabel>
        <Input
          autoComplete="organization"
          height="4.9rem"
          onChange={e => setCompany(e.target.value)}
          placeholder="Company name"
          type="text"
          value={company}
        />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Company website</InputLabel>
        <Input
          autoComplete="url"
          height="4.9rem"
          onChange={e => setUrl(e.target.value)}
          placeholder="Company website"
          type="url"
          value={url}
        />
      </InputWrapper>
      <ButtonWrapper>
        <ProgressButton
          disabled={
            company.length === 0 || email.length === 0 || name.length === 0
          }
          error={error}
          label="Send"
          loading={loading}
          onClick={() => dispatchSendContact({ company, email, name, url })}
          success={success}
        />
      </ButtonWrapper>
    </RecruitmentFormContainer>
  );
};

RecruitmentForm.propTypes = {
  dispatchResetFeedback: T.func.isRequired,
  dispatchSendContact: T.func.isRequired,
  error: T.bool.isRequired,
  loading: T.bool.isRequired,
  success: T.bool.isRequired,
};

export default RecruitmentForm;
