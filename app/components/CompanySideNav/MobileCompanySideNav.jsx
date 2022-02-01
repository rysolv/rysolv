/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import CompanyProfile from './CompanyProfile';
import {
  BottomFade,
  ButtonGroup,
  ButtonTextWrapper,
  CompanySideNavContainer,
  CompanySideNavHeader,
  CreatePositionButton,
  DashedLine,
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
  company,
  handleCreatePosition,
  handleNav,
  handleSelectPosition,
  positions,
  selectedPosition,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <ConditionalRender
        Component={CompanyProfile}
        propsToPassDown={{ handleNav, ...company }}
        shouldRender={!isEmpty(company)}
      />
      <CompanySideNavContainer isExpanded={isExpanded}>
        <CompanySideNavHeader>Positions</CompanySideNavHeader>
        <CreatePositionButton onClick={handleCreatePosition}>
          {AddCircleOutlineIcon} Create position
        </CreatePositionButton>
        <ButtonGroup>
          {positions.map(({ id, isRemote = 'Yes', location, title }, index) => (
            <ConditionalRender
              key={`${title}-${index}`}
              Component={
                <PositionButton
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
              }
              shouldRender={isExpanded || index < 2}
            />
          ))}
          <ConditionalRender
            Component={<BottomFade />}
            shouldRender={!isExpanded && positions.length > 1}
          />
          <ConditionalRender
            Component={
              <div>
                <StyledIconButton
                  disableRipple
                  icon={isExpanded ? ExpandLessIcon : ExpandMoreIcon}
                  isExpanded={isExpanded}
                  onClick={() => setIsExpanded(!isExpanded)}
                  tooltipProps={{
                    disableFocusListener: true,
                    disableHoverListener: true,
                    disableTouchListener: true,
                  }}
                />
                <DashedLine isExpanded={isExpanded} />
              </div>
            }
            shouldRender={positions.length > 1}
          />
        </ButtonGroup>
      </CompanySideNavContainer>
    </div>
  );
};

MobileCompanySideNav.propTypes = {
  company: T.object.isRequired,
  handleCreatePosition: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleSelectPosition: T.func.isRequired,
  positions: T.array.isRequired,
  selectedPosition: T.string.isRequired,
};

export default MobileCompanySideNav;
