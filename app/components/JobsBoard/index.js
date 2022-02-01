import React, { useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import { commonKeywords } from 'containers/JobsBoard/constants';

import SearchInput from './SearchInput';
import { JobsList, NoJobsList } from './JobsList';
import {
  CommonKeywordsWrapper,
  JobsBoardContainer,
  JobsBoardHeader,
  JobsBoardSubText,
  KeywordTag,
} from './styledComponents';

const JobsBoard = ({ dispatchChangeFilter, filter, handleNav, jobs }) => {
  const [searchTerm, setSearchTerm] = useState(filter);

  const handleChangeFilter = () => {
    dispatchChangeFilter({ filter: searchTerm });
  };

  const handleSelectKeyword = keyword => {
    dispatchChangeFilter({ filter: keyword });
    setSearchTerm(keyword);
  };

  return (
    <JobsBoardContainer>
      <JobsBoardHeader>Jobs</JobsBoardHeader>
      <JobsBoardSubText>
        Apply to hundreds of jobs with one profile.
      </JobsBoardSubText>
      <SearchInput
        handleChangeFilter={handleChangeFilter}
        handleChangeInput={setSearchTerm}
        value={searchTerm}
      />
      <CommonKeywordsWrapper>
        {commonKeywords.map(keyword => (
          <KeywordTag
            key={keyword}
            onClick={() => handleSelectKeyword(keyword)}
          >
            {keyword}
          </KeywordTag>
        ))}
      </CommonKeywordsWrapper>
      <ConditionalRender
        Component={JobsList}
        FallbackComponent={NoJobsList}
        propsToPassDown={{
          handleNav,
          handleSelectKeyword,
          jobs,
        }}
        shouldRender={!!jobs.length}
      />
    </JobsBoardContainer>
  );
};

JobsBoard.propTypes = {
  dispatchChangeFilter: T.func.isRequired,
  filter: T.string.isRequired,
  handleNav: T.func.isRequired,
  jobs: T.array.isRequired,
};

export default JobsBoard;
