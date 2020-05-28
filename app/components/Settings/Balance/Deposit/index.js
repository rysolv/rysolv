import React from 'react';
import T from 'prop-types';

import { ComponentLink, ComponentText } from '../styledComponents';

const DepositComponent = ({ handleNav }) => (
  <div>
    <ComponentText>
      Add money to your account. 3.6% will be charged as a transaction fee.
    </ComponentText>
    <ComponentLink onClick={() => handleNav('/settings/deposit')}>
      Deposit money
    </ComponentLink>
  </div>
);

DepositComponent.propTypes = { handleNav: T.func.isRequired };

export default DepositComponent;
