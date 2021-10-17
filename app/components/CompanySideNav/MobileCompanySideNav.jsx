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
  PositionTitle,
  StyledIconButton,
} from './styledComponents';

const AddCircleOutlineIcon = iconDictionary('addCircleOutline');
const ExpandLessIcon = iconDictionary('expandLess');
const ExpandMoreIcon = iconDictionary('expandMore');
const JobIcon = iconDictionary('workOutline');

const MobileCompanySideNav = ({
  handleCreatePosition,
  handleSelectPosition,
  positions,
  selectedPosition,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
      <CreatePositionButton onClick={handleCreatePosition}>
        {AddCircleOutlineIcon} Create Position
      </CreatePositionButton>
      <ConditionalRender
        Component={
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
                      shouldRender={isRemote}
                    />
                  </LocationText>
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
  handleCreatePosition: T.func.isRequired,
  handleSelectPosition: T.func.isRequired,
  positions: T.array.isRequired,
  selectedPosition: T.string.isRequired,
};

export default MobileCompanySideNav;
