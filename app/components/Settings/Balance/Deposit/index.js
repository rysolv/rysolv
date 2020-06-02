import React from 'react';
import T from 'prop-types';

import {
  ComponentContainer,
  ComponentText,
  ComponentTitle,
  StyledSecondaryButton,
} from '../styledComponents';

const DepositComponent = ({ handleNav }) => (
  <ComponentContainer>
    <ComponentTitle>Add Funding</ComponentTitle>
    <ComponentText>
      Add money to your account. 3.6% will be charged as a transaction fee.
    </ComponentText>
    <StyledSecondaryButton
      label="Deposit"
      onClick={() => handleNav('/settings/deposit')}
    />
  </ComponentContainer>
);

DepositComponent.propTypes = { handleNav: T.func.isRequired };

export default DepositComponent;
