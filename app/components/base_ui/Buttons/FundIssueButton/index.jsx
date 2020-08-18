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
  email,
  firstName,
  fundedAmount,
  issueId,
  lastName,
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
            email,
            firstName,
            fundedAmount,
            issueId,
            lastName,
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
  balance: T.number.isRequired,
  disabled: T.bool,
  dispatchOpenModal: T.func,
  email: T.string,
  firstName: T.string,
  fundedAmount: T.number,
  issueId: T.string,
  lastName: T.string,
  open: T.bool,
  userId: T.string,
};

export default FundIssueButton;
