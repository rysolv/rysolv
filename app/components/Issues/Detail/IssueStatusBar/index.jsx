import React from 'react';
import T from 'prop-types';

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
  const { attempting, open, id } = data;
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
              handleIncrement({ userId, id, column: 'attempting' })
            }
          />
        ) : (
          <StyledSecondaryButton
            disabled={!open}
            label="attempt"
            onClick={() =>
              handleIncrement({ userId, id, column: 'attempting' })
            }
          />
        )}
      </StatusItem>
      <StatusItem>
        <StatusTitle>0 Pull Requests</StatusTitle>
        <StyledSecondaryButton disabled={!open} label="Submit PR" />
      </StatusItem>
      <StatusItem>
        <StatusTitle>Funded</StatusTitle>
        <StyledSecondaryButton disabled={!open} label="$ Fund Issue" />
      </StatusItem>
    </StatusBar>
  );
};

IssueStatusBar.propTypes = {
  data: T.object,
  handleIncrement: T.func,
  activeUser: T.object,
};

export default IssueStatusBar;
