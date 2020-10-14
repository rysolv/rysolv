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
  issueId,
  open,
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
            fundedAmount,
            issueId,
            open,
          },
        })
      }
    >
      {AddIcon}
    </AddFundsButton>
  </FundIssueButtonContainer>
);

FundIssueButton.defaultProps = { disabled: false };

FundIssueButton.propTypes = {
  disabled: T.bool,
  dispatchOpenModal: T.func.isRequired,
  fundedAmount: T.number.isRequired,
  issueId: T.string.isRequired,
  open: T.bool.isRequired,
};

export default FundIssueButton;
