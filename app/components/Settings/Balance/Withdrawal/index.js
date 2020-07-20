import React from 'react';
import T from 'prop-types';

import {
  ComponentContainer,
  ComponentText,
  ComponentTitle,
  StyledSecondaryButton,
} from '../styledComponents';

const WithdrawalComponent = ({ handleNav, setDisplayBottom }) => {
  const handleClick = () => {
    handleNav('/settings/withdrawal');
    setDisplayBottom(true);
  };
  return (
    <ComponentContainer>
      <ComponentTitle>Withdraw Funding</ComponentTitle>
      <ComponentText>Transfer money from your account.</ComponentText>
      <StyledSecondaryButton label="Withdraw" onClick={handleClick} />
    </ComponentContainer>
  );
};

WithdrawalComponent.propTypes = {
  handleNav: T.func.isRequired,
  setDisplayBottom: T.func.isRequired,
};

export default WithdrawalComponent;
