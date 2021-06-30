import React, { Fragment } from 'react';
import T from 'prop-types';

import Feedback from 'components/Feedback';
import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';
import {
  FeatureCommentImage,
  FeatureFundingImage,
  FeatureProfileImage,
} from 'utils/png';

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
  StyledImage,
  StyledLink,
  StyledPrimaryButton,
  StyledSecondaryButton,
  TextWrapper,
  TopRowContributors,
} from './styledComponents';

const BackgroundHollowCircle = iconDictionary('backgroundHollowCircle');
const BackgroundSolidCircle = iconDictionary('backgroundSolidCircle');
const HeaderImageLeft = iconDictionary('headerImageLeft');
const HeaderImageRight = iconDictionary('headerImageRight');
const NextIcon = iconDictionary('navigateNext');

const Landing = ({ dispatchSendContact, error, loading, stats, success }) => (
  <Fragment>
    <LandingContainer>
      <div>
        <div>
          <LandingContainerText>
            A crowdfunding
            <br />
            platform for
            <br />
            open source.
          </LandingContainerText>
          <ButtonGroup>
            <StyledSecondaryButton
              label="Become a Rysolver"
              onClick={() => {}}
            />
            <StyledPrimaryButton label="Add your team" onClick={() => {}} />
          </ButtonGroup>
        </div>
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
              <StyledImage
                alt=""
                loading="lazy"
                src={FeatureCommentImage}
                width="49.5rem"
              />
            </PrimaryLandingCard>
          </LandingCardGroup>
          <LandingCardGroup>
            <PrimaryLandingCard isFloatingLeft>
              <StyledImage
                alt=""
                loading="lazy"
                src={FeatureProfileImage}
                width="49.5rem"
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
            onClick={() => {}}
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
            <StyledImage
              alt=""
              loading="lazy"
              src={FeatureFundingImage}
              width="47.6rem"
            />
          </FundingImage>
        </FundingContainer>
        <ActionContainer>
          <ActionHeader>Get started on your first bounty</ActionHeader>
          <ActionCardWrapper>
            <ActionCard>
              <ActionCardTitle>
                Find issues in your favorite language.
              </ActionCardTitle>
              <StyledLink to="/">Browse bounties {NextIcon}</StyledLink>
            </ActionCard>
            <ActionCard>
              <ActionCardTitle>Build your developer profile.</ActionCardTitle>
              <StyledLink to="/">Sign up {NextIcon}</StyledLink>
            </ActionCard>
            <ActionCard>
              <ActionCardTitle>
                Have a specific project in mind?
              </ActionCardTitle>
              <StyledLink to="/">Browse teams {NextIcon}</StyledLink>
            </ActionCard>
          </ActionCardWrapper>
        </ActionContainer>
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
              <Contributor />
              <Contributor />
            </TopRowContributors>
            <BottomRowContributors>
              <Contributor hasNoMargin />
              <Contributor />
              <Contributor />
              <Contributor />
            </BottomRowContributors>
          </ContributorsWrapper>
          <ContributorsLinkWrapper>
            <StyledLink to="/" width="14.3rem">
              See all teams {NextIcon}
            </StyledLink>
            <StyledLink margin="8.2rem" to="/" width="14.3rem">
              Add your team {NextIcon}
            </StyledLink>
          </ContributorsLinkWrapper>
        </ContributorsContainer>
        <FeedbackContainer>
          <div>
            <FeedbackHeader>Want to get involved?</FeedbackHeader>
            <FeedbackSubheader>Tell us more about your team.</FeedbackSubheader>
          </div>
          <Feedback
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
  dispatchSendContact: T.func.isRequired,
  error: T.bool.isRequired,
  loading: T.bool.isRequired,
  stats: T.object.isRequired,
  success: T.bool.isRequired,
};

export default Landing;
