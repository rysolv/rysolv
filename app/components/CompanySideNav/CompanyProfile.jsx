/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  CompanyProfileContainer,
  Logo,
  LogoWrapper,
  NameText,
  NameWrapper,
  StyledEditButton,
} from './styledComponents';

const AddIcon = iconDictionary('add');
const EditIcon = iconDictionary('edit');

const CompanyProfile = ({ handleNav, logo, name }) => {
  const hasImage = !!logo;

  return (
    <CompanyProfileContainer>
      <ConditionalRender
        Component={<Logo src={logo} />}
        FallbackComponent={
          <LogoWrapper
            onClick={() => handleNav(`/company/dashboard/edit-company`)}
          >
            {AddIcon}
          </LogoWrapper>
        }
        shouldRender={hasImage}
      />
      <NameWrapper>
        <NameText>{name}</NameText>
        <StyledEditButton
          disableRipple
          onClick={() => handleNav(`/company/dashboard/edit-company`)}
        >
          {EditIcon}
        </StyledEditButton>
      </NameWrapper>
    </CompanyProfileContainer>
  );
};

CompanyProfile.propTypes = {
  handleNav: T.func.isRequired,
  logo: T.string,
  name: T.string.isRequired,
};

export default CompanyProfile;
