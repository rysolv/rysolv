/* eslint-disable react/no-array-index-key */
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

const CompanyDashboard = ({ candidates, dispatchSaveCandidate }) => (
  <Fragment>
    <CompanyDashboardContainer>
      {candidates.map((candidate, index) => (
        <CandidateCard
          key={index}
          dispatchSaveCandidate={dispatchSaveCandidate}
          index={index}
          {...candidate}
        />
      ))}
    </CompanyDashboardContainer>
    <HeaderImageRightIcon>{RecruitmentHeaderImageRight}</HeaderImageRightIcon>
    <HeaderImageLeftIcon>{HeaderImageLeft}</HeaderImageLeftIcon>
  </Fragment>
);

CompanyDashboard.propTypes = {
  candidates: T.array.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
};

export default CompanyDashboard;
