/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  ButtonTextWrapper,
  CompanySideNavContainer,
  CompanySideNavHeader,
  LocationText,
  PositionButton,
  StyledIconButton,
} from './styledComponents';

const ExpandLessIcon = iconDictionary('expandLess');
const ExpandMoreIcon = iconDictionary('expandMore');
const JobIcon = iconDictionary('workOutline');

const MobileCompanySideNav = ({
  dispatchSelectPosition,
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
      <ConditionalRender
        Component={
          <div>
            {positions.map(({ id, location, title }, index) => (
              <PositionButton
                key={`${title}-${index}`}
                isLast={positions.length - 1 === index}
                isSelected={id === selectedPosition}
                onClick={() => dispatchSelectPosition({ id })}
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
  positions: T.array.isRequired,
  selectedPosition: T.string.isRequired,
};

export default MobileCompanySideNav;
