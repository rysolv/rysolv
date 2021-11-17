import React from 'react';
import T from 'prop-types';

import {
  CompanyName,
  CompanyProfileContainer,
  Description,
  Logo,
} from './styledComponents';

const CompanyProfile = ({ company }) => {
  const { description, name, logo } = company;
  return (
    <CompanyProfileContainer>
      <Logo src={logo} />
      <CompanyName>{name}</CompanyName>
      <Description>{description}</Description>
    </CompanyProfileContainer>
  );
};

CompanyProfile.propTypes = {
  company: T.object,
};

export default CompanyProfile;
