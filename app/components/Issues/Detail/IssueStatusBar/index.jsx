import React from 'react';
import T from 'prop-types';
import { FundingWrapper } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  StatusBar,
  StatusItem,
  StyledSecondaryButton,
  StatusTitle,
} from './styledComponents';

const IssueStatusBar = ({
  activeUser,
  activeUser: { id: userId },
  data,
  handleIncrement,
}) => {
  const { attempting, open, id, value } = data;
  const activeAttempt = activeUser.attempting.includes(id);

  return (
    <StatusBar>
      <StatusItem>
        <StatusTitle>{attempting.length} Attempting</StatusTitle>
        <StyledSecondaryButton
          disabled={!open}
          label={activeAttempt ? 'un-attempt' : 'attempt'}
          onClick={() =>
            handleIncrement({
              userId,
              id,
              column: 'attempting',
              remove: activeAttempt,
            })
          }
        />
      </StatusItem>
      <StatusItem>
        <StatusTitle>0 Pull Requests</StatusTitle>
        <StyledSecondaryButton disabled={!open} label="Submit PR" />
      </StatusItem>
      <StatusItem>
        <StatusTitle>
          Funded:{' '}
          <FundingWrapper
            medium
            open={open}
            value={formatDollarAmount(value)}
          />
        </StatusTitle>
        <StyledSecondaryButton disabled={!open} label="$ Fund Issue" />
      </StatusItem>
    </StatusBar>
  );
};

IssueStatusBar.propTypes = {
  activeUser: T.object,
  data: T.object,
  handleIncrement: T.func,
};

export default IssueStatusBar;
