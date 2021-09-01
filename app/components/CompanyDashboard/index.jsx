import React, { Fragment } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import CandidateCard from './CandidateCard';
import {
  CompanyDashboardContainer,
  HeaderImageLeftIcon,
  HeaderImageRightIcon,
} from './styledComponents';

const HeaderImageLeft = iconDictionary('headerImageLeft');
const RecruitmentHeaderImageRight = iconDictionary(
  'recruitmentHeaderImageRight',
);

const CompanyDashboard = ({ candidates }) => (
  <Fragment>
    <CompanyDashboardContainer>
      {candidates.map(candidate => (
        <CandidateCard {...candidate} />
      ))}
    </CompanyDashboardContainer>
    <HeaderImageRightIcon>{RecruitmentHeaderImageRight}</HeaderImageRightIcon>
    <HeaderImageLeftIcon>{HeaderImageLeft}</HeaderImageLeftIcon>
  </Fragment>
);

CompanyDashboard.propTypes = { candidates: T.array.isRequired };

export default CompanyDashboard;
