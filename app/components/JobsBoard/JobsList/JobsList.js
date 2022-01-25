import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import { generatePostedDate } from 'utils/globalHelpers';

import {
  BottomContentWrapper,
  ContentWrapper,
  HorizontalDivider,
  JobCard,
  JobCompany,
  JobContent,
  JobLocation,
  JobLogo,
  JobLogoWrapper,
  JobSalary,
  JobsListContainer,
  JobTitle,
  KeywordWrapper,
  MiddleContentWrapper,
  PostedDate,
  TextWrapper,
  TopContentWrapper,
} from './styledComponents';
import { KeywordTag } from '../styledComponents';

const JobsList = ({ handleNav, jobs, setSearchTerm }) => (
  <JobsListContainer>
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
          <Fragment>
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
                  <MiddleContentWrapper>
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
                  </MiddleContentWrapper>
                  <BottomContentWrapper>
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
                  </BottomContentWrapper>
                </ContentWrapper>
                <PostedDate>{generatePostedDate(createdDate)}</PostedDate>
              </JobContent>
            </JobCard>
            <HorizontalDivider />
          </Fragment>
        );
      },
    )}
  </JobsListContainer>
);

JobsList.propTypes = {
  handleNav: T.func.isRequired,
  jobs: T.array.isRequired,
  setSearchTerm: T.func.isRequired,
};

export default JobsList;
