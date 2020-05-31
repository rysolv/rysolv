import React from 'react';
import T from 'prop-types';

import {
  ComponentContainer,
  ComponentText,
  ComponentTitle,
  StyledSecondaryButton,
} from '../styledComponents';

const WithdrawalComponent = ({ handleNav }) => (
  <ComponentContainer>
    <ComponentTitle>Withdraw Funding</ComponentTitle>
    <ComponentText>Transfer money from your account.</ComponentText>
    <StyledSecondaryButton
      label="Withdraw"
      onClick={() => handleNav('/settings/withdrawal')}
    />
  </ComponentContainer>
);

WithdrawalComponent.propTypes = { handleNav: T.func.isRequired };

export default WithdrawalComponent;
