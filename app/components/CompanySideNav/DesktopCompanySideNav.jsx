/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  ButtonTextWrapper,
  CompanySideNavContainer,
  CompanySideNavHeader,
  CreatePositionButton,
  LocationText,
  PositionButton,
  PositionTitle,
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
      {positions.map(({ id, isRemote, location, title }, index) => (
        <PositionButton
          key={`${title}-${index}`}
          isLast={positions.length - 1 === index}
          isSelected={id === selectedPosition}
          onClick={() => handleSelectPosition({ id })}
        >
          {JobIcon}
          <ButtonTextWrapper>
            <PositionTitle>{title}</PositionTitle>
            <br />
            <LocationText>
              {location}&nbsp;
              <ConditionalRender
                Component={<span>(Remote)</span>}
                shouldRender={isRemote === 'Yes'}
              />
            </LocationText>
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
