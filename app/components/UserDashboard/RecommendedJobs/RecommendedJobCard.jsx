import React from 'react';
import T from 'prop-types';

import { formatDollarAmount, generatePostedDate } from 'utils/globalHelpers';

import {
  BottomContentWrapper,
  CardTitleWrapper,
  ContentWrapper,
  JobCardContainer,
  JobCompany,
  JobCompanyWrapper,
  JobContent,
  JobLocation,
  JobSalary,
  JobTitle,
  KeywordTag,
  KeywordWrapper,
  MiddleContentWrapper,
  PostedDate,
  TextWrapper,
  TopContentWrapper,
} from './styledComponents';

const RecommendedJobCard = ({
  companyName,
  createdDate,
  handleNav,
  id,
  location,
  positionData: { salary, title },
  role,
  skills,
}) => {
  const formattedSkills = skills.map(({ name }) => name);
  const keywordArray = [...role, ...formattedSkills];
  const salaryNumber = parseInt(salary.replace(/\$|,/g, ''), 10);

  const handleKeywordClick = (e, keyword) => {
    e.stopPropagation();
    handleNav(`/jobs?search=${keyword}`);
  };

  return (
    <JobCardContainer onClick={() => handleNav(`/jobs/${id}`)}>
      <JobContent>
        <ContentWrapper>
          <TopContentWrapper>
            <CardTitleWrapper>
              <JobTitle>{title.toLowerCase()}&nbsp;</JobTitle>
              <JobCompanyWrapper>
                <TextWrapper>at&nbsp;</TextWrapper>
                <JobCompany>{companyName.toLowerCase()}</JobCompany>
              </JobCompanyWrapper>
            </CardTitleWrapper>
            <PostedDate>{generatePostedDate(createdDate)}</PostedDate>
          </TopContentWrapper>
          <MiddleContentWrapper>
            <JobSalary>
              <span aria-label="money-icon" role="img">
                &#128176;
              </span>
              {formatDollarAmount(salaryNumber - 15000, true)}
              &nbsp;-&nbsp;
              {formatDollarAmount(salaryNumber, true)}
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
                  language={keyword}
                  onClick={e => handleKeywordClick(e, keyword)}
                />
              ))}
            </KeywordWrapper>
          </BottomContentWrapper>
        </ContentWrapper>
      </JobContent>
    </JobCardContainer>
  );
};

RecommendedJobCard.propTypes = {
  companyName: T.string.isRequired,
  createdDate: T.string.isRequired,
  handleNav: T.func.isRequired,
  id: T.string.isRequired,
  location: T.string.isRequired,
  positionData: T.object.isRequired,
  role: T.array.isRequired,
  skills: T.array.isRequired,
};

export default RecommendedJobCard;
