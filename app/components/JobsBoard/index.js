import React, { useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import { generatePostedDate } from 'utils/globalHelpers';

import SearchInput from './SearchInput';
import {
  BottomContentWrapper,
  JobCard,
  JobCompany,
  JobContent,
  JobLocation,
  JobLogo,
  JobSalary,
  JobsBoardHeader,
  JobsBoardContainer,
  JobTitle,
  PostedDate,
  TopContentWrapper,
  ContentWrapper,
  TextWrapper,
  JobLogoWrapper,
  KeywordWrapper,
  KeywordTag,
} from './styledComponents';

const JobsBoard = ({ handleNav, jobs }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <JobsBoardContainer>
      <JobsBoardHeader>Jobs Board</JobsBoardHeader>
      <SearchInput value={searchTerm} />
      {jobs.map(
        ({
          companyLogo,
          companyName,
          createdDate,
          id,
          location,
          positionData: { salary, title },
          role,
          skills,
        }) => {
          const firstLetterOfTitle = title.charAt(0);
          const formattedSkills = skills.map(({ name }) => name);
          const keywordArray = [...role, ...formattedSkills];

          return (
            <JobCard key={`job-${id}`}>
              <ConditionalRender
                Component={<JobLogo src={companyLogo} />}
                FallbackComponent={
                  <JobLogoWrapper>{firstLetterOfTitle}</JobLogoWrapper>
                }
                shouldRender={!!companyLogo}
              />
              <JobContent>
                <ContentWrapper>
                  <TopContentWrapper>
                    <JobTitle onClick={() => handleNav(`/positions?id=${id}`)}>
                      {title}
                    </JobTitle>
                    &nbsp;
                    <TextWrapper>at</TextWrapper>&nbsp;
                    <JobCompany>{companyName}</JobCompany>
                  </TopContentWrapper>
                  <BottomContentWrapper>
                    <JobSalary>
                      <span aria-label="money-icon" role="img">
                        &#128176;
                      </span>
                      {salary}
                    </JobSalary>
                    <JobLocation>
                      <span aria-label="world-icon" role="img">
                        &#127758;
                      </span>
                      Remote - {location}
                    </JobLocation>
                  </BottomContentWrapper>
                </ContentWrapper>
                <KeywordWrapper>
                  {keywordArray.map(keyword => (
                    <KeywordTag
                      key={keyword}
                      onClick={() => setSearchTerm(keyword)}
                    >
                      {keyword}
                    </KeywordTag>
                  ))}
                </KeywordWrapper>
                <PostedDate>{generatePostedDate(createdDate)}</PostedDate>
              </JobContent>
            </JobCard>
          );
        },
      )}
    </JobsBoardContainer>
  );
};

JobsBoard.propTypes = {
  handleNav: T.func.isRequired,
  jobs: T.array.isRequired,
};

export default JobsBoard;
