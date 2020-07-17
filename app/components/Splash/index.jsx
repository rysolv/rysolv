import React, { Fragment } from 'react';
import T from 'prop-types';

import issueExampleImage from 'images/issueExampleLandingPage.png';
import iconDictionary from 'utils/iconDictionary';

import {
  ButtonWrapper,
  CircleOne,
  CircleThree,
  CircleTwo,
  CircleWrapper,
  ContentWrapper,
  CreateAccountButton,
  Image,
  ImageNavBar,
  ImageWrapper,
  LogoText,
  Row,
  RowWrapper,
  SplashBackground,
  SplashContent,
  TagLine,
} from './styledComponents';

const ArrowIcon = iconDictionary('viewAll');

const Splash = ({ handleNav }) => (
  <Fragment>
    <SplashBackground>
      <SplashContent>
        <ImageWrapper>
          <ImageNavBar>
            <CircleWrapper>
              <CircleOne />
              <CircleTwo />
              <CircleThree />
            </CircleWrapper>
            <RowWrapper>
              <Row />
              <Row />
              <Row />
            </RowWrapper>
          </ImageNavBar>
          <Image src={issueExampleImage} />
        </ImageWrapper>
        <ContentWrapper>
          <LogoText>rysolv</LogoText>
          <TagLine>
            A crowdfunding platform for open source development.
          </TagLine>
          <ButtonWrapper>
            <CreateAccountButton onClick={() => handleNav('/signup')}>
              Create Account {ArrowIcon}
            </CreateAccountButton>
          </ButtonWrapper>
        </ContentWrapper>
      </SplashContent>
    </SplashBackground>
  </Fragment>
);

Splash.propTypes = { handleNav: T.func.isRequired };

export default Splash;
