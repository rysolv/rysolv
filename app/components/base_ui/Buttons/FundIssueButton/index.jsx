import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  AddFundsButton,
  FundAmount,
  FundIssueButtonContainer,
  StyledFundingWrapper,
} from './styledComponents';

const AddIcon = iconDictionary('add');

const FundIssueButton = ({
  disabled,
  dispatchOpenModal,
  fundedAmount,
  open,
}) => (
  <FundIssueButtonContainer>
    <FundAmount>
      <StyledFundingWrapper
        open={open}
        value={formatDollarAmount(fundedAmount)}
      />
    </FundAmount>
    <AddFundsButton
      disabled={disabled}
      onClick={() =>
        dispatchOpenModal({
          modalState: 'fundIssue',
          tableData: fundedAmount,
        })
      }
    >
      {AddIcon}
    </AddFundsButton>
  </FundIssueButtonContainer>
);

FundIssueButton.propTypes = {
  disabled: T.bool,
  dispatchOpenModal: T.func,
  fundedAmount: T.number,
  open: T.bool,
};

export default FundIssueButton;
