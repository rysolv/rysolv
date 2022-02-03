/* eslint-disable prettier/prettier */
import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  ActionCard,
  ActionCardTitle,
  ActionCardWrapper,
  ActionContainer,
  ActionHeader,
  BackgroundHollowCircleBottomIcon,
  BackgroundHollowCircleTopIcon,
  BackgroundSolidCircleIcon,
  BottomRowContributors,
  ButtonGroup,
  CandidateCardContainer,
  CandidateCardImage,
  CandidateHeader,
  CandidateMatchImage,
  CandidateSubtext,
  Contributor,
  ContributorsContainer,
  ContributorsHeader,
  ContributorsLinkWrapper,
  ContributorsWrapper,
  HeaderImageLeftIcon,
  HeaderImageRightIcon,
  LandingCard,
  LandingCardContainer,
  LandingCardGroup,
  LandingCardLargeText,
  LandingCardSmallText,
  LandingContainer,
  LandingContainerText,
  PrimaryLandingCard,
  StyledCommentImage,
  StyledProfileImage,
  StyledLink,
  StyledPrimaryButton,
  StyledSecondaryButton,
  TextWrapper,
  TopRowContributors,
  LandingWrapper,
} from './styledComponents';

const BackgroundHollowCircle = iconDictionary('backgroundHollowCircle');
const BackgroundSolidCircle = iconDictionary('backgroundSolidCircle');
const HeaderImageLeft = iconDictionary('headerImageLeft');
const HeaderImageRight = iconDictionary('headerImageRight');
const NextIcon = iconDictionary('navigateNext');

const Landing = ({ handleNav }) => (
  <Fragment>
    <LandingContainer>
      <div>
        <LandingWrapper>
          <LandingContainerText>
            Find jobs that
            <br />
            match your skills
          </LandingContainerText>
          <ButtonGroup>
            <StyledSecondaryButton
              label="Get started"
              onClick={() => handleNav('/apply')}
            />
            <StyledPrimaryButton
              label="Hire engineers"
              onClick={() => handleNav('/signup?type=company')}
            />
          </ButtonGroup>
        </LandingWrapper>
        <LandingCardContainer>
          {/* Developer Profile Card */}
          <LandingCardGroup>
            <LandingCard>
              <TextWrapper>
                <LandingCardLargeText>
                  Build your
                  <br />
                  developer profile.
                </LandingCardLargeText>
                <LandingCardSmallText>
                  We analyze your coding history, and match you with companies
                  looking for your skills.
                </LandingCardSmallText>
              </TextWrapper>
            </LandingCard>
            <PrimaryLandingCard>
              <StyledCommentImage
                alt="Profile Image"
                loading="lazy"
                src="https://rysolv.s3.us-east-2.amazonaws.com/FeatureProfileImage.png"
              />
            </PrimaryLandingCard>
          </LandingCardGroup>

          {/* Jobs Card */}
          <LandingCardGroup>
            <PrimaryLandingCard isFloatingLeft>
              <StyledProfileImage
                alt="Job card"
                loading="lazy"
                src="https://rysolv.s3.us-east-2.amazonaws.com/FeatureJobImage.png"
              />
            </PrimaryLandingCard>
            <LandingCard isFloatingLeft>
              <TextWrapper isFloatingLeft>
                <LandingCardLargeText>
                  Discover amazing
                  <br />
                  opportunities.
                </LandingCardLargeText>
                <LandingCardSmallText>
                  Apply to as many jobs as you want with one profile.
                </LandingCardSmallText>
              </TextWrapper>
            </LandingCard>
          </LandingCardGroup>
        </LandingCardContainer>

        {/* Candidate Card */}
        <CandidateCardContainer>
          <CandidateCardImage
            alt="Candidate Card"
            loading="lazy"
            src="https://rysolv.s3.us-east-2.amazonaws.com/FeatureCandidateCard.png"
          />
          <CandidateMatchImage
            alt="Candidate match"
            loading="lazy"
            src="https://rysolv.s3.us-east-2.amazonaws.com/FeatureCandidateMatchCard.png"
          />
          <div>
            <CandidateHeader>Get matched with top companies.</CandidateHeader>
            <CandidateSubtext>
              Once your profile is complete, you&apos;ll start being matched
              with companies.
            </CandidateSubtext>
          </div>
        </CandidateCardContainer>

        {/* Steps Container */}
        <ActionContainer>
          <ActionHeader>Get started on your journey</ActionHeader>
          <ActionCardWrapper>
            <ActionCard hasNoMargin>
              <ActionCardTitle>Create your developer profile.</ActionCardTitle>
              <StyledLink to="/apply">Create Profile {NextIcon}</StyledLink>
            </ActionCard>
            <ActionCard>
              <ActionCardTitle>Get matched with top companies.</ActionCardTitle>
              <StyledLink to="/apply">Sign up {NextIcon}</StyledLink>
            </ActionCard>
            <ActionCard>
              <ActionCardTitle>Land the perfect job.</ActionCardTitle>
              <StyledLink to="/jobs">Browse jobs {NextIcon}</StyledLink>
            </ActionCard>
          </ActionCardWrapper>
        </ActionContainer>

        {/* Company logos */}
        <ConditionalRender
          Component={
            <ContributorsContainer>
              <ContributorsHeader>
                Get matched with
                <br />
                top companies.
              </ContributorsHeader>
              <ContributorsWrapper>
                <TopRowContributors>
                  <Contributor hasNoMargin />
                  <Contributor />
                  <Contributor />
                  <Contributor removeSecond />
                  <Contributor removeFirst />
                </TopRowContributors>
                <BottomRowContributors>
                  <Contributor hasNoMargin />
                  <Contributor />
                  <Contributor removeSecond />
                  <Contributor removeFirst />
                </BottomRowContributors>
              </ContributorsWrapper>
              <ContributorsLinkWrapper>
                <StyledLink to="/apply" width="14.3rem">
                  Create Profile {NextIcon}
                </StyledLink>
                <StyledLink margin="8.2rem" to="/jobs" width="14.3rem">
                  Find Jobs {NextIcon}
                </StyledLink>
              </ContributorsLinkWrapper>
            </ContributorsContainer>
          }
          shouldRender={false}
        />
      </div>
    </LandingContainer>
    <HeaderImageRightIcon>{HeaderImageRight}</HeaderImageRightIcon>
    <HeaderImageLeftIcon>{HeaderImageLeft}</HeaderImageLeftIcon>
    <BackgroundHollowCircleTopIcon>
      {BackgroundHollowCircle}
    </BackgroundHollowCircleTopIcon>
    <BackgroundHollowCircleBottomIcon>
      {BackgroundHollowCircle}
    </BackgroundHollowCircleBottomIcon>
    <BackgroundSolidCircleIcon>
      {BackgroundSolidCircle}
    </BackgroundSolidCircleIcon>
  </Fragment>
);

Landing.propTypes = { handleNav: T.func.isRequired };

export default Landing;
