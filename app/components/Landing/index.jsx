import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import {
  Card,
  CardContainer,
  CardIcon,
  CardItem,
  CardTitleWrapper,
  Icon,
  IconCircle,
  IconWrapper,
  LandingWrapper,
  List,
  ListContainer,
  Section,
  StyledLink,
  StyledSubheader,
  SubheaderWrapper,
  TextWrapper,
} from './styledComponents';

const ArrowIcon = iconDictionary('viewAll');
const CodeIcon = iconDictionary('code');
const ComputerIcon = iconDictionary('computer');
const IssueIcon = iconDictionary('issue');
const OrganizationIcon = iconDictionary('organization');
const UserIcon = iconDictionary('user');

const Landing = () => (
  <LandingWrapper>
    <Section>
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
            <CardIcon>{UserIcon}</CardIcon>
            <CardTitleWrapper>Sign Up Today</CardTitleWrapper>
            <TextWrapper>
              The best way to earn income while contributing to open source
              development.
            </TextWrapper>
            <StyledLink to="/users">Create account {ArrowIcon}</StyledLink>
          </Card>
        </CardItem>
        <CardItem>
          <Card>
            <CardIcon>{OrganizationIcon}</CardIcon>
            <CardTitleWrapper>Browse Organizations</CardTitleWrapper>
            <TextWrapper>
              Support some of the awesome organizations that use rysolv.
            </TextWrapper>
            <StyledLink to="/organizations">
              Find an organization {ArrowIcon}
            </StyledLink>
          </Card>
        </CardItem>
        <CardItem>
          <Card>
            <CardIcon>{IssueIcon}</CardIcon>
            <CardTitleWrapper>Browse Issues</CardTitleWrapper>
            <TextWrapper>
              Find issues and get paid to solve them. Contribute to software
              people use every day.
            </TextWrapper>
            <StyledLink to="/issues">Find an issue {ArrowIcon}</StyledLink>
          </Card>
        </CardItem>
      </CardContainer>
    </Section>
    <Section>
      <SubheaderWrapper>
        <StyledSubheader>How it works</StyledSubheader>
        <IconWrapper>
          <Icon>
            <IconCircle>{ComputerIcon}</IconCircle>
          </Icon>
        </IconWrapper>
      </SubheaderWrapper>
      <ListContainer>
        <List>Hi</List>
        <List>Hi</List>
        <List>Hi</List>
        <List>Hi</List>
      </ListContainer>
    </Section>
  </LandingWrapper>
);

export default Landing;
