/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { PrimaryButton, SecondaryButton } from 'components/base_ui';
import {
  blueGrayColor,
  darkBlueColor,
  grayColor,
  navyColor,
  whiteColor,
} from 'defaultStyleHelper';

export const ButtonGroup = styled.div`
  margin-top: 3.2rem;
`;

export const LandingContainer = styled.div`
  height: 100%;
  padding: 18.4rem 12rem 0;
  position: relative;
  z-index: 1;

  @media (max-width: 700px) {
    padding: 41.8rem 3rem 0;
  }
`;

export const LandingContainerText = styled.span`
  color: ${whiteColor};
  font-size: 5.6rem;
  font-weight: 700;
  line-height: 6.16rem;

  @media (max-width: 1283px) {
    font-size: 4.6rem;
    line-height: 5.16rem;
  }

  br {
    @media (max-width: 1030px) {
      display: none;
    }
  }
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  background: ${darkBlueColor};
  border: 0.2rem solid ${whiteColor};
  color: ${whiteColor};
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  margin: 0 0 0 2.4rem;
  text-transform: none;
  width: 16.3rem;

  &:hover {
    background: ${darkBlueColor};
  }
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  background: ${whiteColor};
  color: ${darkBlueColor};
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  margin: 0;
  text-transform: none;
  width: 19.7rem;

  &:hover {
    background: ${whiteColor};
  }
`;

export const HeaderImageLeftIcon = styled.div`
  svg {
    left: -0.21rem;
    position: absolute;
    top: 66.1rem;
  }

  @media (max-width: 1290px) {
    display: none;
  }
`;

export const HeaderImageRightIcon = styled.div`
  svg {
    position: absolute;
    right: 0;
    top: 21.9rem;
  }

  @media (max-width: 1200px) {
    svg {
      height: 50.3rem;
      width: auto;
    }
  }

  @media (max-width: 1100px) {
    svg {
      height: 45.3rem;
    }
  }

  @media (max-width: 525px) {
    svg {
      height: 39.3rem;
    }
  }

  @media (max-width: 460px) {
    svg {
      height: 36.3rem;
    }
  }

  @media (max-width: 430px) {
    svg {
      height: 33.3rem;
    }
  }

  @media (max-width: 395px) {
    svg {
      height: 33.3rem;
      left: 1rem;
    }
  }
`;

export const LandingCard = styled.div`
  background: ${blueGrayColor};
  border-radius: 0.7rem;
  box-shadow: none;
  height: 25.2rem;
  left: ${({ isFloatingLeft }) => (isFloatingLeft ? '50.8rem' : '0')};
  padding: 6.4rem 10rem;
  position: ${({ isFloatingLeft }) =>
    isFloatingLeft ? 'absolute' : 'relative'};
  top: 0;
  width: 79.3rem;
  z-index: 0;

  @media (max-width: 1500px) {
    width: 69.3rem;
  }

  @media (max-width: 1400px) {
    left: ${({ isFloatingLeft }) => (isFloatingLeft ? '41.8rem' : '0')};
    width: 59.3rem;
  }

  @media (max-width: 1200px) {
    height: 51.3rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const PrimaryLandingCard = styled.div`
  align-items: center;
  background: ${whiteColor};
  border-radius: 0.7rem;
  box-shadow: 0px 4px 50px #182f6a;
  display: flex;
  height: 21.2rem;
  justify-content: center;
  left: ${({ isFloatingLeft }) => (isFloatingLeft ? '0' : '50.8rem')};
  padding: 6.4rem 10rem;
  position: ${({ isFloatingLeft }) =>
    isFloatingLeft ? 'relative' : 'absolute'};
  top: 5.6rem;
  width: 69.2rem;
  z-index: 1;

  @media (max-width: 1500px) {
    width: 59.2rem;
  }

  @media (max-width: 1400px) {
    width: 49.2rem;
  }

  @media (max-width: 1200px) {
    left: 50%;
    top: 23.8rem;
    transform: translateX(-50%);
    width: 69.2rem;
  }
`;

export const LandingCardGroup = styled.div`
  margin-bottom: 7.7rem;
  margin-left: -50.8rem;
  position: relative;

  @media (max-width: 1200px) {
    margin-left: 0;
  }
`;

export const LandingCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 38.5rem;
  place-items: center;

  @media (max-width: 1030px) {
    margin-top: 53.5rem;
  }
`;

export const LandingCardLargeText = styled.div`
  color: ${whiteColor};
  font-size 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
`;

export const LandingCardSmallText = styled.div`
  color: ${whiteColor};
  font-size 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  margin-top: 0.8rem;
`;

export const BackgroundSolidCircleIcon = styled.div`
  svg {
    left: 50%;
    position: absolute;
    top: 95.7rem;
    transform: translateX(-50%);
  }

  @media (max-width: 1200px) {
    svg {
      top: 201.9rem;
    }
  }
`;

export const TextWrapper = styled.div`
  float: ${({ isFloatingLeft }) => (isFloatingLeft ? 'right' : 'left')};
  max-width: 32.7rem;

  @media (max-width: 1200px) {
    float: left;
  }
`;

export const StyledProfileImage = styled.img`
  height: auto;
  width: 49.5rem;

  @media (max-width: 1400px) {
    width: 42.5rem;
  }
`;

export const StyledCommentImage = styled.img`
  height: auto;
  width: 49.5rem;

  @media (max-width: 1400px) {
    width: 42.5rem;
  }
`;

export const StyledFundingImage = styled.img`
  height: auto;
  width: 47.6rem;

  @media (max-width: 595px) {
    width: 40rem;
  }

  @media (max-width: 505px) {
    width: 35rem;
  }

  @media (max-width: 450px) {
    width: 30rem;
  }

  @media (max-width: 400px) {
    width: 25.8rem;
  }

  @media (max-width: 350px) {
    width: 22.5rem;
  }
`;

export const Stat = styled.div`
  font-size: 4rem;
  font-weight: 700;
  line-height: 4.2rem;
  margin-bottom: 0.5rem;
`;

export const StatsContainer = styled.div`
  color: ${whiteColor};
  margin: auto;
  padding-top: 15.8rem;
  text-align: center;
  width: 34.5rem;

  @media (max-width: 1200px) {
    padding-top: 71.4rem;
  }
`;

export const StatsHeader = styled.div`
  align-self: center;
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
`;

export const StatsText = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.936rem;
`;

export const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2.7rem 0 4.5rem;
`;

export const FundingContainer = styled.div`
  display: flex;
  height: 25.2rem;
  margin: 21.9rem auto 0;
  max-width: 120rem;

  @media (max-width: 1263px) {
    align-items: center;
    flex-direction: column;
  }

  @media (max-width: 1200px){
    margin-top: 54.9rem;
  }
`;

export const FundingDescription = styled.div`
  background: ${blueGrayColor};
  border-bottom-left-radius: 0.7rem;
  border-top-left-radius: 0.7rem;
  padding: 6.4rem 8.2rem;
  width: 50%;

  @media (max-width: 1263px) {
    border-bottom-left-radius: 0rem;
    border-top-right-radius: 0.7rem;
    width: 100%;
  }

  @media (max-width: 740px) {
    padding: 3.7rem 3.5rem;
  }
`;

export const FundingImage = styled.div`
  align-items: center;
  background: ${navyColor};
  border-bottom-right-radius: 0.7rem;
  border-top-right-radius: 0.7rem;
  display: flex;
  justify-content: center;
  width: 50%;

  @media (max-width: 1263px) {
    border-bottom-left-radius: 0.7rem;
    border-top-right-radius: 0;
    padding: 2rem;
    width: 100%;
  }

  @media (max-width: 595px) {
    svg {
      width: 28.5rem;
    }
  }
`;

export const ActionContainer = styled.div`
  color: ${whiteColor};
  display: flex;
  margin-top: 36.7rem;

  @media (max-width: 1275px) {
    flex-direction: column;
  }
`;

export const ActionCard = styled.div`
  background: ${blueGrayColor};
  border-radius: 0.7rem;
  display: flex;
  flex-direction: column;
  height: 28.5rem;
  justify-content: space-between;
  margin-left: 2.5rem;
  padding: 4rem 3.2rem 3.5rem;
  width: 28.5rem;

  @media (max-width: 1456px) {
    height: 25.5rem;
    width: 25.5rem;
  }

  @media (max-width: 1366px) {
    height: 22.5rem;
    padding: 2.4rem;
    width: 22.5rem;
  }

  @media (max-width: 1275px) {
    margin-left: ${({ hasNoMargin }) => hasNoMargin ? 0 : '2.5rem'};
  }

  @media (max-width: 900px) {
    height: 28.5rem;
    margin: 0 auto 1.6rem;
    width: 28.5rem;
  }

  @media (max-width: 900px) {
    height: 22.5rem;
    width: 22.5rem;
  }
`;

export const ActionCardWrapper = styled.div`
  display: flex;

  @media (max-width: 1275px) {
    align-self: center;
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const ActionHeader = styled.div`
  font-size 3.2rem;
  font-weight: 700;
  line-height: 3.873rem;
  margin-right: 7.4rem;
  margin-top: 2rem;
  min-width: 19.8rem;

  @media (max-width: 12755px) {
    margin: 0 auto 3.3rem;
    min-width: 15.9rem;
    text-align: center;
  }
`;

export const ActionCardTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3.45rem;
`;

export const StyledLink = styled(Link)`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  justify-content: space-between;
  line-height: 2.208rem;
  margin-left: ${({ margin }) => margin || 0};
  width: ${({ width }) => width || 'auto'};

  svg {
    height: 2.4rem;
    width: 2.4rem;
  }

  @media (max-width: 485px) {
    margin-left: ${({ margin }) => (margin ? '3.2rem' : 0)};
  }

  @media (max-width: 390px) {
    margin-left: 0;
    margin-top: ${({ margin }) => (margin ? '2rem' : 0)};
  }
`;

export const BackgroundHollowCircleBottomIcon = styled.div`
  svg {
    left: -6.4rem;
    position: absolute;
    top: 382.4rem;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const BackgroundHollowCircleTopIcon = styled.div`
  svg {
    left: 92rem;
    position: absolute;
    top: 249.9rem;
  }
`;

export const Contributor = styled.div`
  background: ${grayColor};
  border-radius: 50%;
  height: 11.4rem;
  margin-left: ${({ hasNoMargin }) => (hasNoMargin ? '0' : '4.1rem')};
  opacity: 0.2;
  width: 11.4rem;

  @media (max-width: 833px) {
    height: 9.5rem;
    margin-left: ${({ hasNoMargin }) => (hasNoMargin ? '0' : '3.1rem')};
    width: 9.5rem;
  }

  @media (max-width: 670px) {
    height: 8.5rem;
    margin-left: ${({ hasNoMargin }) => (hasNoMargin ? '0' : '3.1rem')};
    width: 8.5rem;
  }

  @media (max-width: 630px) {
    display: ${({ removeFirst }) => (removeFirst ? 'none' : 'flex')};
  }

  @media (max-width: 550px) {
    height: 7.5rem;
    margin-left: ${({ hasNoMargin }) => (hasNoMargin ? '0' : '2.5rem')};
    width: 7.5rem;
  }

  @media (max-width: 440px) {
    display: ${({ removeFirst, removeSecond }) =>
    removeFirst || removeSecond ? 'none' : 'flex'};
  }
`;

export const ContributorsContainer = styled.div`
  align-items: center;
  color: ${whiteColor};
  display: flex;
  flex-direction: column;
  margin-top: 36.1rem;
`;

export const ContributorsWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 4rem 0;
`;

export const ContributorsHeader = styled.div`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  text-align: center;
`;

export const ContributorsLinkWrapper = styled.div`
  display: flex;

  @media (max-width: 390px) {
    flex-direction: column;
  }
`;

export const BottomRowContributors = styled.div`
  display: flex;
  margin-top: 1.6rem;
`;

export const TopRowContributors = styled.div`
  display: flex;
`;

export const FeedbackContainer = styled.div`
  background: ${blueGrayColor};
  border-radius: 0.7rem;
  color: ${whiteColor};
  display: flex;
  height: 47.5rem;
  margin: 24.4rem auto 5.6rem;
  max-width: 120rem;
  padding: 6.4rem 7.5rem;

  @media (max-width: 1000px) {
    flex-direction: column;
    height: auto;
  }

  @media (max-width: 500px) {
    padding: 2.6rem 2.8rem 5.052rem;
  }
`;

export const FeedbackHeader = styled.div`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.873rem;
`;

export const FeedbackSubheader = styled.div`
  font-size: 2.4rem;
  font-weight; 400;
  line-height: 2.905rem;
  margin-top: 0.9rem;
`;

export const LandingWrapper = styled.div`
  @media (max-width: 1030px) {
    margin-top: -15rem;
  }
`;