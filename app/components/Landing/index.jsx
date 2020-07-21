import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import {
  Card,
  CardContainer,
  CardIcon,
  CardItem,
  CardTitleWrapper,
  HorizontalList,
  Icon,
  IconCircle,
  IconWrapper,
  LandingWrapper,
  List,
  ListContainer,
  ListContent,
  ListImage,
  ListText,
  ListTitle,
  Section,
  StyledLink,
  StyledSubheader,
  SubheaderWrapper,
  TextWrapper,
} from './styledComponents';

const ArrowIcon = iconDictionary('viewAll');
const CodeIcon = iconDictionary('code');
const ComputerIcon = iconDictionary('computer');
const FourIcon = iconDictionary('four');
const IssueIcon = iconDictionary('issue');
const OneIcon = iconDictionary('one');
const OrganizationIcon = iconDictionary('organization');
const ThreeIcon = iconDictionary('three');
const TwoIcon = iconDictionary('two');
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
            <CardTitleWrapper>Sign Up</CardTitleWrapper>
            <TextWrapper>
              The best way to earn income while contributing to open source
              development.
            </TextWrapper>
            <StyledLink to="/signup">Create account {ArrowIcon}</StyledLink>
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
        <HorizontalList>
          <List>
            <ListImage>{OneIcon}</ListImage>
            <ListContent>
              <ListTitle>Fund an issue</ListTitle>
              <ListText>
                Help improve tools people use everyday. Anyone can create an
                issue, and add bounties to it.
              </ListText>
            </ListContent>
          </List>
          <List>
            <ListImage>{TwoIcon}</ListImage>
            <ListContent>
              <ListTitle>Find issues to solve</ListTitle>
              <ListText>
                Browse through opportunities, and find an issue to fix.
              </ListText>
            </ListContent>
          </List>
        </HorizontalList>
        <HorizontalList>
          <List>
            <ListImage>{ThreeIcon}</ListImage>
            <ListContent>
              <ListTitle>Submit a solution</ListTitle>
              <ListText>
                After you solve the problem, you can submit your pull request
                via Rysolv.
              </ListText>
            </ListContent>
          </List>
          <List>
            <ListImage>{FourIcon}</ListImage>
            <ListContent>
              <ListTitle>Get paid</ListTitle>
              <ListText>
                When your pull request is merged, you will earn the bounty
                placed on that issue.
              </ListText>
            </ListContent>
          </List>
        </HorizontalList>
      </ListContainer>
    </Section>
  </LandingWrapper>
);

export default Landing;
