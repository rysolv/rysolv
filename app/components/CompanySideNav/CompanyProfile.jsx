/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  CompanyProfileContainer,
  Logo,
  NameWrapper,
  StyledEditButton,
} from './styledComponents';

const EditIcon = iconDictionary('edit');

const CompanyProfile = ({ handleNav, logo, name }) => (
  <CompanyProfileContainer>
    <ConditionalRender Component={<Logo src={logo} />} shouldRender={!!logo} />
    <NameWrapper>
      {name}
      <StyledEditButton
        disableRipple
        onClick={() => handleNav(`/company/dashboard/edit-company`)}
      >
        {EditIcon}
      </StyledEditButton>
    </NameWrapper>
  </CompanyProfileContainer>
);

CompanyProfile.propTypes = {
  handleNav: T.func.isRequired,
  logo: T.string,
  name: T.string.isRequired,
};

export default CompanyProfile;
