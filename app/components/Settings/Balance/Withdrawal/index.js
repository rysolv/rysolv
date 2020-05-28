import React from 'react';
import T from 'prop-types';

import { ComponentLink, ComponentText } from '../styledComponents';

const WithdrawalComponent = ({ handleNav }) => (
  <div>
    <ComponentText>Transfer money from your account.</ComponentText>
    <ComponentLink onClick={() => handleNav('/settings/withdrawal')}>
      Withdraw money
    </ComponentLink>
  </div>
);

WithdrawalComponent.propTypes = { handleNav: T.func.isRequired };

export default WithdrawalComponent;
