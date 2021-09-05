import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  CompanySideNavContainer,
  CompanySideNavHeader,
  PositionButton,
  PositionButtonGroup,
} from './styledComponents';

const JobIcon = iconDictionary('workOutline');

const CompanySideNav = ({
  dispatchSelectPosition,
  positions,
  selectedPosition,
}) => (
  <CompanySideNavContainer>
    <CompanySideNavHeader>My Jobs</CompanySideNavHeader>
    <PositionButtonGroup>
      {positions.map(position => (
        <PositionButton
          icon={JobIcon}
          isSelected={position === selectedPosition}
          label={position}
          onClick={() => dispatchSelectPosition({ position })}
        />
      ))}
    </PositionButtonGroup>
  </CompanySideNavContainer>
);

CompanySideNav.propTypes = {
  dispatchSelectPosition: T.func.isRequired,
  positions: T.array.isRequired,
  selectedPosition: T.string.isRequired,
};

export default CompanySideNav;
