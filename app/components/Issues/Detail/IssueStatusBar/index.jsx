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

        {activeAttempt ? (
          <StyledSecondaryButton
            disabled={!open}
            label="un-attempt"
            onClick={() =>
              handleIncrement({
                userId,
                id,
                column: 'attempting',
                remove: true,
              })
            }
          />
        ) : (
          <StyledSecondaryButton
            disabled={!open}
            label="attempt"
            onClick={() =>
              handleIncrement({
                userId,
                id,
                column: 'attempting',
                remove: false,
              })
            }
          />
        )}
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
