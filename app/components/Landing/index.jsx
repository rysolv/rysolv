import React from 'react';
import { Link } from 'react-router-dom';

import iconDictionary from 'utils/iconDictionary';

import {
  Card,
  CardContainer,
  CardItem,
  Icon,
  IconCircle,
  IconWrapper,
  LandingWrapper,
  StyledSubheader,
  SubheaderWrapper,
} from './styledComponents';

const CodeIcon = iconDictionary('code');

const Landing = () => (
  <LandingWrapper>
    <SubheaderWrapper>
      <StyledSubheader>Start rysolving</StyledSubheader>
      <IconWrapper>
        <Icon>
          <IconCircle>{CodeIcon}</IconCircle>
        </Icon>
      </IconWrapper>
    </SubheaderWrapper>
    <CardContainer>
      <CardItem>
        <Card>
          <Link to="/issues">Issues</Link>
        </Card>
      </CardItem>
      <CardItem>
        <Card>
          <Link to="/organizations">Organizations</Link>
        </Card>
      </CardItem>
      <CardItem>
        <Card>
          <Link to="/users">Users</Link>
        </Card>
      </CardItem>
    </CardContainer>
  </LandingWrapper>
);

export default Landing;
