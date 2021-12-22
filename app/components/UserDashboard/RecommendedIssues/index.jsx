import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import NoRecommendedIssues from './NoRecommendedIssues';
import RecommendedIssueCard from './RecommendedIssueCard';
import {
  IssuesWrapper,
  RecommendedIssuesContainer,
  RecommendedIssuesHeader,
  StyledPrimaryButton,
} from './styledComponents';

const RecommendedIssues = ({ dispatchOpenModal, handleNav, issues }) => {
  const RecommendedIssueComponent = (
    <IssuesWrapper>
      {issues.map((issue, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <RecommendedIssueCard key={`issue-${index}`} {...issue} />
      ))}
    </IssuesWrapper>
  );

  return (
    <RecommendedIssuesContainer>
      <RecommendedIssuesHeader>
        Solve issues, improve your skills
      </RecommendedIssuesHeader>
      <ConditionalRender
        Component={() => RecommendedIssueComponent}
        FallbackComponent={NoRecommendedIssues}
        propsToPassDown={{ dispatchOpenModal }}
        shouldRender={!!issues.length}
      />
      <StyledPrimaryButton
        label="Browse all issues"
        onClick={() => handleNav('/issues')}
      />
    </RecommendedIssuesContainer>
  );
};

RecommendedIssues.propTypes = {
  dispatchOpenModal: T.func.isRequired,
  handleNav: T.func.isRequired,
  issues: T.array.isRequired,
};

export default RecommendedIssues;
