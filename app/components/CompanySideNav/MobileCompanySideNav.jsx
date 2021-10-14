/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
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
  StyledIconButton,
} from './styledComponents';

const AddCircleOutlineIcon = iconDictionary('addCircleOutline');
const ExpandLessIcon = iconDictionary('expandLess');
const ExpandMoreIcon = iconDictionary('expandMore');
const JobIcon = iconDictionary('workOutline');

const MobileCompanySideNav = ({
  dispatchSelectPosition,
  handleNav,
  positions,
  selectedPosition,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelectPosition = ({ id }) => {
    dispatchSelectPosition({ id });
    handleNav('/dashboard');
  };

  return (
    <CompanySideNavContainer isExpanded={isExpanded}>
      <CompanySideNavHeader>
        Positions
        <StyledIconButton
          icon={isExpanded ? ExpandLessIcon : ExpandMoreIcon}
          onClick={() => setIsExpanded(!isExpanded)}
          tooltipProps={{
            disableFocusListener: true,
            disableHoverListener: true,
            disableTouchListener: true,
          }}
        />
      </CompanySideNavHeader>
      <CreatePositionButton onClick={() => handleNav('/dashboard/add')}>
        {AddCircleOutlineIcon} Create Position
      </CreatePositionButton>
      <ConditionalRender
        Component={
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
        }
        shouldRender={isExpanded}
      />
    </CompanySideNavContainer>
  );
};

MobileCompanySideNav.propTypes = {
  dispatchSelectPosition: T.func.isRequired,
  handleNav: T.func.isRequired,
  positions: T.array.isRequired,
  selectedPosition: T.string.isRequired,
};

export default MobileCompanySideNav;
