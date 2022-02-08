/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { PrimaryButton, SecondaryButton } from 'components/base_ui';
import {
  blueGrayColor,
  codeFontFamily,
  darkBlueColor,
  grayColor,
  whiteColor,
} from 'defaultStyleHelper';

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
    margin-left: ${({ hasNoMargin }) => (hasNoMargin ? 0 : '2.5rem')};
  }

  @media (max-width: 900px) {
    height: 28.5rem;
    margin: ${({ isLast }) => (isLast ? '0 auto' : '0 auto 1.6rem')};
    width: 28.5rem;
  }

  @media (max-width: 900px) {
    height: 22.5rem;
    width: 22.5rem;
  }
`;

export const ActionCardTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3.45rem;
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

export const ActionContainer = styled.div`
  color: ${whiteColor};
  display: flex;
  margin: 24.4rem auto 5.6rem;

  @media (max-width: 1275px) {
    flex-direction: column;
  }
`;

export const ActionHeader = styled.div`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.873rem;
  margin-right: 7.4rem;
  margin-top: 2rem;
  min-width: 19.8rem;

  @media (max-width: 1275px) {
    margin: 0 auto 3.3rem;
    min-width: 15.9rem;
    text-align: center;
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

export const BackgroundSolidCircleIcon = styled.div`
  svg {
    left: 50%;
    position: absolute;
    top: 95.7rem;
    transform: translateX(-50%);
  }

  @media (max-width: 1200px) {
    svg {
      top: 208.9rem;
    }
  }

  @media (max-width: 1030px) {
    svg {
      top: 220.9rem;
    }
  }

  @media (max-width: 860px) {
    svg {
      display: none;
    }
  }
`;

export const BottomRowContributors = styled.div`
  display: flex;
  margin-top: 1.6rem;
`;

export const ButtonGroup = styled.div`
  margin-top: 3.2rem;

  @media (max-width: 460px) {
    display: flex;
    flex-direction: column;
  }
`;

export const CandidateContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 21.9rem auto 0;
  max-width: 140rem;

  @media (max-width: 1200px) {
    margin-top: 46.9rem;
  }

  @media (max-width: 1030px) {
    margin-top: 24.4rem;
  }
`;

export const CandidateDescription = styled.div`
  padding: 0 8.2rem 6.4rem;
  text-align: center;
  width: 100%;

  @media (max-width: 740px) {
    padding: 0 3.5rem 3.7rem;
  }
`;

export const CandidateImage = styled.div`
  position: relative;
  width: 46rem;

  @media (max-width: 755px) {
    width: 42rem;
  }

  @media (max-width: 700px) {
    width: 46rem;
  }

  @media (max-width: 575px) {
    width: 42rem;
  }

  @media (max-width: 535px) {
    width: 38rem;
  }

  @media (max-width: 495px) {
    width: 36rem;
  }

  @media (max-width: 495px) {
    width: 24rem;
  }
`;

export const CandidateImageGroup = styled.div`
  align-items: center;
  background: ${whiteColor};
  border-radius: 0.7rem;
  display: flex;
  justify-content: center;
  padding: 2rem;
  width: 100%;
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

export const ContributorsWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 4rem 0;
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

  @media (max-width: 1030px) {
    svg {
      top: 31.9rem;
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

  @media (max-width: 345px) {
    svg {
      top: 33.9rem;
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

  @media (max-width: 755px) {
    height: 50.3rem;
    width: 50.5rem;
  }

  @media (max-width: 600px) {
    height: 35.3rem;
    padding: 2.4rem 3rem;
    width: 38.2rem;
  }

  @media (max-width: 450px) {
    height: 34.3rem;
    width: 28.2rem;
  }
`;

export const LandingCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 38.5rem;
  place-items: center;

  @media (max-width: 1030px) {
    height: 110rem;
    margin-top: 62.5rem;
  }

  @media (max-width: 600px) {
    height: 78rem;
  }

  @media (max-width: 450px) {
    height: 76rem;
    margin-top: 54.5rem;
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

export const LandingCardLargeText = styled.div`
  color: ${whiteColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
`;

export const LandingCardSmallText = styled.div`
  color: ${whiteColor};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  margin-top: 0.8rem;

  @media (max-width: 450px) {
    font-size: 1.4rem;
    line-height: 1.656rem;
    margin-top: 0.4rem;
  }
`;

export const LandingContainer = styled.div`
  height: 100%;
  padding: 18.4rem 12rem 0;
  position: relative;
  z-index: 1;

  @media (max-width: 700px) {
    padding: 18.4rem 3rem 0;
  }
`;

export const LandingContainerText = styled.span`
  color: ${whiteColor};
  font-size: 5.6rem;
  font-weight: 700;
  line-height: 6.16rem;

  span {
    font-family: ${codeFontFamily};
  }

  @media (max-width: 550px) {
    font-size: 4.6rem;
    line-height: 5.16rem;
  }

  @media (max-width: 460px) {
    font-size: 3.6rem;
    line-height: 4.104rem;
  }

  @media (max-width: 350px) {
    font-size: 3rem;
    line-height: 3.5rem;
  }
`;

export const LandingWrapper = styled.div`
  height: 32rem;

  @media (max-width: 1030px) {
    margin-top: -18rem;
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

  @media (max-width: 755px) {
    width: 55.5rem;
  }

  @media (max-width: 600px) {
    height: 14rem;
    padding: 3.5rem 1.9rem;
    top: 17.8rem;
    width: 41.5rem;
  }

  @media (max-width: 450px) {
    height: 12rem;
    top: 19.8rem;
    width: 30.5rem;
  }
`;

export const StyledCandidateImage = styled.img`
  width: 24rem;

  @media (max-width: 535px) {
    width: 22rem;
  }

  @media (max-width: 495px) {
    width: 20rem;
  }

  @media (max-width: 475px) {
    width: 24rem;
  }
`;

export const StyledCandidateMatchImage = styled.img`
  height: auto;
  position: absolute;
  right: 0rem;
  top: -1rem;
  width: 24rem;

  @media (max-width: 755px) {
    width: 20rem;
  }

  @media (max-width: 700px) {
    width: 24rem;
  }

  @media (max-width: 575px) {
    width: 20rem;
  }

  @media (max-width: 535px) {
    width: 18rem;
  }

  @media (max-width: 475px) {
    display: none;
  }
`;

export const StyledCommentImage = styled.img`
  height: auto;
  width: 49.5rem;

  @media (max-width: 1400px) {
    width: 42.5rem;
  }

  @media (max-width: 600px) {
    width: 39.5rem;
  }

  @media (max-width: 450px) {
    width: 29rem;
  }
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

  @media (max-width: 992px) {
    font-size: 1.376rem;
  }

  @media (max-width: 460px) {
    margin: 2.4rem 0 0;
  }
`;

export const StyledProfileImage = styled.img`
  height: auto;
  width: 49.5rem;

  @media (max-width: 1400px) {
    width: 42.5rem;
  }

  @media (max-width: 600px) {
    width: 39.5rem;
  }

  @media (max-width: 450px) {
    width: 29rem;
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
  width: 16.3rem;

  &:hover {
    background: ${whiteColor};
  }
  
  @media (max-width: 992px) {
    font-size: 1.376rem;
  }
`;

export const TextWrapper = styled.div`
  float: ${({ isFloatingLeft }) => (isFloatingLeft ? 'right' : 'left')};
  max-width: 32.7rem;

  @media (max-width: 1200px) {
    float: left;
  }
`;

export const TopRowContributors = styled.div`
  display: flex;
`;
