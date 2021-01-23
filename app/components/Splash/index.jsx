import React, { Fragment } from 'react';
import T from 'prop-types';

import { ImageWrapper } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  ButtonWrapper,
  ContentWrapper,
  CreateAccountButton,
  LogoText,
  SplashBackground,
  SplashContent,
  TagLine,
} from './styledComponents';

const ArrowIcon = iconDictionary('navigateNext');

const Splash = ({ handleNav }) => (
  <Fragment>
    <SplashBackground>
      <SplashContent>
        <ImageWrapper image="https://rysolv.s3.us-east-2.amazonaws.com/issueExampleLandingPage.png" />
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
