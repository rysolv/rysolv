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
  balance,
  disabled,
  dispatchOpenModal,
  fundedAmount,
  issueId,
  open,
  userId,
}) => (
  <FundIssueButtonContainer>
    <FundAmount open={open}>
      <StyledFundingWrapper
        open={open}
        value={formatDollarAmount(fundedAmount)}
      />
    </FundAmount>
    <AddFundsButton
      disabled={disabled}
      open={open}
      onClick={() =>
        dispatchOpenModal({
          modalState: 'fundIssue',
          tableData: {
            balance,
            fundedAmount,
            issueId,
            open,
            userId,
          },
        })
      }
    >
      {AddIcon}
    </AddFundsButton>
  </FundIssueButtonContainer>
);

FundIssueButton.propTypes = {
  balance: T.number,
  disabled: T.bool,
  dispatchOpenModal: T.func,
  fundedAmount: T.number,
  issueId: T.string,
  open: T.bool,
  userId: T.string,
};

export default FundIssueButton;
