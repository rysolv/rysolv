/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import CompanyProfile from './CompanyProfile';
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
  company,
  handleCreatePosition,
  handleNav,
  handleSelectPosition,
  positions,
  selectedPosition,
}) => (
  <div>
    <ConditionalRender
      Component={CompanyProfile}
      propsToPassDown={{ handleNav, ...company }}
      shouldRender={!isEmpty(company)}
    />
    <CompanySideNavContainer>
      <CompanySideNavHeader>Positions</CompanySideNavHeader>
      <CreatePositionButton onClick={handleCreatePosition}>
        {AddCircleOutlineIcon} Create Position
      </CreatePositionButton>
      <div>
        {positions.map(({ id, isRemote = 'Yes', location, title }, index) => (
          <PositionButton
            key={`${title}-${index}`}
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
  </div>
);

DesktopCompanySideNav.propTypes = {
  company: T.object.isRequired,
  handleCreatePosition: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleSelectPosition: T.func.isRequired,
  positions: T.array.isRequired,
  selectedPosition: T.string.isRequired,
};

export default DesktopCompanySideNav;
