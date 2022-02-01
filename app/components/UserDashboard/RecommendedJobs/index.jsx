import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import NoRecommendedJobs from './NoRecommendedJobs';
import RecommendedJobCard from './RecommendedJobCard';
import {
  JobsWrapper,
  RecommendedJobsContainer,
  RecommendedJobsHeader,
  StyledPrimaryButton,
} from './styledComponents';

const RecommendedJobs = ({ handleNav, jobs }) => {
  const RecommendedJobComponent = (
    <JobsWrapper>
      {jobs.map((job, index) => (
        <RecommendedJobCard
          // eslint-disable-next-line react/no-array-index-key
          key={`job-${index}`}
          handleNav={handleNav}
          {...job}
        />
      ))}
    </JobsWrapper>
  );

  return (
    <RecommendedJobsContainer hasMinHeight={jobs.length < 3}>
      <RecommendedJobsHeader>
        Jobs we think you&#39;d be perfect for
      </RecommendedJobsHeader>
      <ConditionalRender
        Component={() => RecommendedJobComponent}
        FallbackComponent={NoRecommendedJobs}
        shouldRender={!!jobs.length}
      />
      <StyledPrimaryButton
        label="Browse all jobs"
        onClick={() => handleNav('/jobs')}
      />
    </RecommendedJobsContainer>
  );
};

RecommendedJobs.propTypes = {
  handleNav: T.func.isRequired,
  jobs: T.array.isRequired,
};

export default RecommendedJobs;
