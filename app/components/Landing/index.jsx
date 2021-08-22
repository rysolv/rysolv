/* eslint-disable prettier/prettier */
import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import Feedback from 'components/Feedback';
import { formatDollarAmount } from 'utils/globalHelpers';
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
  Contributor,
  ContributorsContainer,
  ContributorsHeader,
  ContributorsLinkWrapper,
  ContributorsWrapper,
  FeedbackContainer,
  FeedbackHeader,
  FeedbackSubheader,
  FundingContainer,
  FundingDescription,
  FundingImage,
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
  Stat,
  StatsContainer,
  StatsHeader,
  StatsText,
  StatsWrapper,
  StyledCommentImage,
  StyledProfileImage,
  StyledLink,
  StyledPrimaryButton,
  StyledSecondaryButton,
  TextWrapper,
  TopRowContributors,
  StyledFundingImage,
  LandingWrapper,
} from './styledComponents';

const BackgroundHollowCircle = iconDictionary('backgroundHollowCircle');
const BackgroundSolidCircle = iconDictionary('backgroundSolidCircle');
const HeaderImageLeft = iconDictionary('headerImageLeft');
const HeaderImageRight = iconDictionary('headerImageRight');
const NextIcon = iconDictionary('navigateNext');

const Landing = ({
  dispatchResetFeedback,
  dispatchSendContact,
  error,
  handleNav,
  loading,
  stats,
  success,
}) => (
  <Fragment>
    <LandingContainer>
      <div>
        <LandingWrapper>
          <LandingContainerText>
            A platform<br/> where <span>engineers</span><br />come to grow.
          </LandingContainerText>
          <ButtonGroup>
            <StyledSecondaryButton
              label="Become a Rysolver"
              onClick={() => handleNav('/signup')}
            />
            <StyledPrimaryButton label="Hire engineers" onClick={() => handleNav('/recruitment')} />
          </ButtonGroup>
        </LandingWrapper>
        <LandingCardContainer>
          <LandingCardGroup>
            <LandingCard>
              <TextWrapper>
                <LandingCardLargeText>
                  Fix code.
                  <br />
                  Earn rewards.
                </LandingCardLargeText>
                <LandingCardSmallText>
                  Once your pull request is approved, you can claim the bounty.
                </LandingCardSmallText>
              </TextWrapper>
            </LandingCard>
            <PrimaryLandingCard>
              <StyledCommentImage
                alt=""
                loading="lazy"
                src="https://rysolv.s3.us-east-2.amazonaws.com/FeatureCommentImage.png"
              />
            </PrimaryLandingCard>
          </LandingCardGroup>
          <LandingCardGroup>
            <PrimaryLandingCard isFloatingLeft>
              <StyledProfileImage
                alt=""
                loading="lazy"
                src="https://rysolv.s3.us-east-2.amazonaws.com/FeatureProfileImage.png"
              />
            </PrimaryLandingCard>
            <LandingCard isFloatingLeft>
              <TextWrapper isFloatingLeft>
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
          </LandingCardGroup>
        </LandingCardContainer>
        <StatsContainer>
          {BackgroundSolidCircle}
          <StatsHeader>
            Help sustain
            <br />
            the OS ecosystem
          </StatsHeader>
          <StatsWrapper>
            <div>
              <Stat>{formatDollarAmount(stats.totalFunded, true)}</Stat>
              <StatsText>bounties contributed</StatsText>
            </div>
            <div>
              <Stat>{stats.totalResolved}</Stat>
              <StatsText>issues resolved</StatsText>
            </div>
          </StatsWrapper>
          <StyledSecondaryButton
            label="Join the community"
            onClick={() => handleNav('/signup')}
          />
        </StatsContainer>
        <FundingContainer>
          <FundingDescription>
            <LandingCardLargeText>
              Support open source
              <br />
              teams you care about.
            </LandingCardLargeText>
            <LandingCardSmallText>
              Add funds to issues you care about. You can also use your bounties
              to support more open source projects!
            </LandingCardSmallText>
          </FundingDescription>
          <FundingImage>
            <StyledFundingImage
              alt=""
              loading="lazy"
              src="https://rysolv.s3.us-east-2.amazonaws.com/FeatureFundingImage.png"
            />
          </FundingImage>
        </FundingContainer>
        <ActionContainer>
          <ActionHeader>Get started on your first bounty</ActionHeader>
          <ActionCardWrapper>
            <ActionCard hasNoMargin>
              <ActionCardTitle>
                Find issues in your favorite language.
              </ActionCardTitle>
              <StyledLink to="/issues">Browse bounties {NextIcon}</StyledLink>
            </ActionCard>
            <ActionCard>
              <ActionCardTitle>Build your developer profile.</ActionCardTitle>
              <StyledLink to="/signup">Sign up {NextIcon}</StyledLink>
            </ActionCard>
            <ActionCard>
              <ActionCardTitle>
                Have a specific project in mind?
              </ActionCardTitle>
              <StyledLink to="/repos">Browse teams {NextIcon}</StyledLink>
            </ActionCard>
          </ActionCardWrapper>
        </ActionContainer>
        <ConditionalRender
          Component={
            <ContributorsContainer>
              <ContributorsHeader>
                Contribute to software
                <br />
                people use every day.
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
                <StyledLink to="/repos" width="14.3rem">
                  See all teams {NextIcon}
                </StyledLink>
                <StyledLink margin="8.2rem" to="/repos/add" width="14.3rem">
                  Add your team {NextIcon}
                </StyledLink>
              </ContributorsLinkWrapper>
            </ContributorsContainer>
          }
          shouldRender={false}
        />
        <FeedbackContainer>
          <div>
            <FeedbackHeader>Want to get involved?</FeedbackHeader>
            <FeedbackSubheader>Tell us more about your team.</FeedbackSubheader>
          </div>
          <Feedback
            dispatchResetFeedback={dispatchResetFeedback}
            dispatchSendContact={dispatchSendContact}
            error={error}
            loading={loading}
            success={success}
          />
        </FeedbackContainer>
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

Landing.propTypes = {
  dispatchResetFeedback: T.func.isRequired,
  dispatchSendContact: T.func.isRequired,
  error: T.bool.isRequired,
  handleNav: T.func.isRequired,
  loading: T.bool.isRequired,
  stats: T.object.isRequired,
  success: T.bool.isRequired,
};

export default Landing;
