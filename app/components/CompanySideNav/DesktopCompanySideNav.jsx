/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  ButtonTextWrapper,
  CompanySideNavContainer,
  CompanySideNavHeader,
  LocationText,
  PositionButton,
} from './styledComponents';

const JobIcon = iconDictionary('workOutline');

const DesktopCompanySideNav = ({
  dispatchSelectPosition,
  positions,
  selectedPosition,
}) => (
  <CompanySideNavContainer>
    <CompanySideNavHeader>Positions</CompanySideNavHeader>
    <div>
      {positions.map(({ location, title }, index) => (
        <PositionButton
          key={`${title}-${index}`}
          isLast={positions.length - 1 === index}
          isSelected={selectedPosition === title}
          onClick={() => dispatchSelectPosition({ position: title })}
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
  dispatchSelectPosition: T.func.isRequired,
  positions: T.array.isRequired,
  selectedPosition: T.string.isRequired,
};

export default DesktopCompanySideNav;
