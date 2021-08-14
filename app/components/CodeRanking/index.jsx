import React, { Fragment } from 'react';

import iconDictionary from 'utils/iconDictionary';

import {
  CompanyRecruitmentContainer,
  CompanyRecruitmentHeader,
  CompanyRecruitmentSubheader,
  HeaderGroup,
  HeaderImageLeftIcon,
  HeaderImageRightIcon,
  HeaderWrapper,
} from './styledComponents';

const HeaderImageLeft = iconDictionary('headerImageLeft');
const RecruitmentHeaderImageRight = iconDictionary(
  'recruitmentHeaderImageRight',
);

const CodeRanking = () => (
  <Fragment>
    <CompanyRecruitmentContainer>
      <HeaderWrapper>
        <HeaderGroup>
          <CompanyRecruitmentHeader>
            Ranking engineer&apos;s code
          </CompanyRecruitmentHeader>
          <CompanyRecruitmentSubheader>
            No one writes sorting algorithms for work. So why does everyone use
            this to judge new applicants? And why do people waste so much
            cumulative time craming for algorithm interviews? Couldn&apos;t
            those hours be better used?
          </CompanyRecruitmentSubheader>
          <CompanyRecruitmentSubheader removeOnMobile>
            What do engineers actually do at work?
            <ul>
              <li>Break assignments into deliverable tasks</li>
              <li>Communicate expectations</li>
              <li>Review code</li>
            </ul>
          </CompanyRecruitmentSubheader>
        </HeaderGroup>
        <HeaderGroup>
          <CompanyRecruitmentHeader>
            Good coders are coders with whom other good coders code
          </CompanyRecruitmentHeader>
          <CompanyRecruitmentSubheader>
            We&apos;re working on the basic assumption that good developers like
            to work with other good developers.
          </CompanyRecruitmentSubheader>
        </HeaderGroup>
        <CompanyRecruitmentSubheader>
          Comparing Languages While our analysis is Lines Of Code (LOC) based,
          we know that each language will have vastly different standards.
        </CompanyRecruitmentSubheader>
        <CompanyRecruitmentSubheader>
          Ex: 5,000 lines of Javascript is probably a handful of React
          components. 5,000 lines of SQL is a serious amount of code.
        </CompanyRecruitmentSubheader>
        Instead of a direct comparison, we weigh each language based on the
        average number of lines per language per user in the Rysolv network.
        Using the JavaScript vs. SQL example: The average Rysolv JavaScript user
        has witten 20,000 lines of JS, and the average SQL user has written 800
        lines of SQL. So examining a user with 10,000 lines of JS and 2,000
        lines of SQL will score below average on JS and above average on SQL.
      </HeaderWrapper>
    </CompanyRecruitmentContainer>
    <HeaderImageRightIcon>{RecruitmentHeaderImageRight}</HeaderImageRightIcon>
    <HeaderImageLeftIcon>{HeaderImageLeft}</HeaderImageLeftIcon>
  </Fragment>
);

export default CodeRanking;
