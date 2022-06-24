/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import CandidateMatchModal from 'components/CandidateMatchModal';

import { CircleGroup, StyledCircle, StyledTableCell } from './styledComponents';

const PercentMatchCell = ({ deviceView, matchCriteria, percentMatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMobileOrTablet =
    deviceView === 'tablet' ||
    deviceView === 'mobile' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileXXS';

  const sortedCriteria = Object.entries(matchCriteria)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  return (
    <StyledTableCell>
      <CircleGroup>
        <StyledCircle
          isMobileOrTablet={isMobileOrTablet}
          onBlur={() => setIsModalOpen(false)}
          onFocus={() => setIsModalOpen(true)}
          onMouseEnter={() => setIsModalOpen(true)}
          onMouseLeave={() => setIsModalOpen(false)}
          onMouseOut={() => setIsModalOpen(false)}
          onMouseOver={() => setIsModalOpen(true)}
          percentage={percentMatch}
        />
        <ConditionalRender
          Component={
            <CandidateMatchModal
              matchCriteria={sortedCriteria}
              percentMatch={percentMatch}
            />
          }
          shouldRender={!isMobileOrTablet && isModalOpen}
        />
      </CircleGroup>
    </StyledTableCell>
  );
};

PercentMatchCell.propTypes = {
  deviceView: T.string.isRequired,
  percentMatch: T.number.isRequired,
  matchCriteria: T.object.isRequired,
};

export default PercentMatchCell;
