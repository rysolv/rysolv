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
  BottomRowContributors,
  ButtonGroup,
  CandidateContainer,
  CandidateDescription,
  CandidateImage,
  CandidateImageGroup,
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
  LandingWrapper,
  PrimaryLandingCard,
  StyledCandidateImage,
  StyledCandidateMatchImage,
  StyledCommentImage,
  StyledLink,
  StyledPrimaryButton,
  StyledProfileImage,
  StyledSecondaryButton,
  TextWrapper,
  TopRowContributors,
} from './styledComponents';

const BackgroundHollowCircle = iconDictionary('backgroundHollowCircle');
const HeaderImageLeft = iconDictionary('headerImageLeft');
const HeaderImageRight = iconDictionary('headerImageRight');
const NextIcon = iconDictionary('navigateNext');

const Landing = ({ handleNav }) => (
  <Fragment>
    <LandingContainer>
      <div>
        <LandingWrapper>
          <LandingContainerText>
            Find <span>jobs</span> that
            <br />
            match your skills.
          </LandingContainerText>
          <ButtonGroup>
            <StyledSecondaryButton
              label="Find jobs"
              onClick={() => handleNav('/apply')}
            />
            <StyledPrimaryButton
              label="Hire engineers"
              onClick={() => handleNav('/signup?type=company')}
            />
          </ButtonGroup>
        </LandingWrapper>
        <LandingCardContainer>
          <LandingCardGroup>
            <LandingCard>
              <TextWrapper>
                <LandingCardLargeText>
                  Build your
                  <br />
                  developer profile.
                </LandingCardLargeText>
                <LandingCardSmallText>
                  We analyze your coding history, and match you with companies looking for your skills.
                </LandingCardSmallText>
              </TextWrapper>
            </LandingCard>
            <PrimaryLandingCard>
              <StyledCommentImage
                alt="profile_image"
                loading="lazy"
                src="https://rysolv.s3.us-east-2.amazonaws.com/FeatureProfileImage.png"
              />
            </PrimaryLandingCard>
          </LandingCardGroup>
          <LandingCardGroup>
            <PrimaryLandingCard isFloatingLeft>
              <StyledProfileImage
                alt="job_image"
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
                  Apply to as many jobs as you want with just one profile.
                </LandingCardSmallText>
              </TextWrapper>
            </LandingCard>
          </LandingCardGroup>
        </LandingCardContainer>
        <CandidateContainer>
          <CandidateDescription>
            <LandingCardLargeText>
              Get matched with top companies.
            </LandingCardLargeText>
            <LandingCardSmallText>
              Once your profile is complete, you&apos;ll be matched with companies!
            </LandingCardSmallText>
          </CandidateDescription>
          <CandidateImageGroup>
            <CandidateImage>
              <StyledCandidateImage
                alt="candidate_image"
                loading="lazy"
                src="https://rysolv.s3.us-east-2.amazonaws.com/FeatureCandidateCard.png"
              />
              <StyledCandidateMatchImage
                alt="candidate_match_image"
                loading="lazy"
                src="https://rysolv.s3.us-east-2.amazonaws.com/FeatureCandidateMatchCard.png"
              />
            </CandidateImage>
          </CandidateImageGroup>
        </CandidateContainer>
        <ActionContainer>
          <ActionHeader>Get started on your journey.</ActionHeader>
          <ActionCardWrapper>
            <ActionCard hasNoMargin>
              <ActionCardTitle>Create your developer profile.</ActionCardTitle>
              <StyledLink to="/apply">Create profile {NextIcon}</StyledLink>
            </ActionCard>
            <ActionCard>
              <ActionCardTitle>Get matched with top companies.</ActionCardTitle>
              <StyledLink to="/apply">Sign up {NextIcon}</StyledLink>
            </ActionCard>
            <ActionCard isLast>
              <ActionCardTitle>Land the perfect job.</ActionCardTitle>
              <StyledLink to="/jobs">Browse jobs {NextIcon}</StyledLink>
            </ActionCard>
          </ActionCardWrapper>
        </ActionContainer>
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
                  Create profile {NextIcon}
                </StyledLink>
                <StyledLink margin="8.2rem" to="/jobs" width="14.3rem">
                  Find jobs {NextIcon}
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
  </Fragment>
);

Landing.propTypes = { handleNav: T.func.isRequired };

export default Landing;
