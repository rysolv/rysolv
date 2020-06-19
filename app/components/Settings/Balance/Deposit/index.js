import React from 'react';
import T from 'prop-types';

import {
  ComponentContainer,
  ComponentText,
  ComponentTitle,
  StyledSecondaryButton,
} from '../styledComponents';

const DepositComponent = ({ handleNav, setDisplayBottom }) => {
  const handleClick = () => {
    handleNav('/settings/deposit');
    setDisplayBottom(true);
  };
  return (
    <ComponentContainer>
      <ComponentTitle>Add Funding</ComponentTitle>
      <ComponentText>
        Add money to your account. 3.6% will be charged as a transaction fee.
      </ComponentText>
      <StyledSecondaryButton label="Deposit" onClick={handleClick} />
    </ComponentContainer>
  );
};

DepositComponent.propTypes = {
  handleNav: T.func.isRequired,
  setDisplayBottom: T.func.isRequired,
};

export default DepositComponent;
