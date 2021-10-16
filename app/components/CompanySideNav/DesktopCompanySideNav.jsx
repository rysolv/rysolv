/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  ButtonTextWrapper,
  CompanySideNavContainer,
  CompanySideNavHeader,
  CreatePositionButton,
  LocationText,
  PositionButton,
} from './styledComponents';

const AddCircleOutlineIcon = iconDictionary('addCircleOutline');
const JobIcon = iconDictionary('workOutline');

const DesktopCompanySideNav = ({
  handleCreatePosition,
  handleSelectPosition,
  positions,
  selectedPosition,
}) => (
  <CompanySideNavContainer>
    <CompanySideNavHeader>Positions</CompanySideNavHeader>
    <CreatePositionButton onClick={handleCreatePosition}>
      {AddCircleOutlineIcon} Create Position
    </CreatePositionButton>
    <div>
      {positions.map(({ id, location, title }, index) => (
        <PositionButton
          key={`${title}-${index}`}
          isLast={positions.length - 1 === index}
          isSelected={id === selectedPosition}
          onClick={() => handleSelectPosition({ id })}
        >
          {JobIcon}
          <ButtonTextWrapper>
            <span>{title}</span>
            <br />
            <LocationText>{location}</LocationText>
          </ButtonTextWrapper>
        </PositionButton>
      ))}
    </div>
  </CompanySideNavContainer>
);

DesktopCompanySideNav.propTypes = {
  handleCreatePosition: T.func.isRequired,
  handleSelectPosition: T.func.isRequired,
  positions: T.array.isRequired,
  selectedPosition: T.string.isRequired,
};

export default DesktopCompanySideNav;
