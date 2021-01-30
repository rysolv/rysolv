import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  CopyrightWrapper,
  Divider,
  FooterWrapper,
  LinkContainer,
  LinkWrapper,
  StyledBottom,
  StyledText,
  StyledTitle,
  StyledTop,
  StyledUrl,
  TextContainer,
  TextWrapper,
  UrlWrapper,
} from './styledComponent';

const FacebookIcon = iconDictionary('facebook');
const GithubIcon = iconDictionary('github');
const TwitterIcon = iconDictionary('twitter');

const Footer = ({ handleNav }) => (
  <FooterWrapper>
    <StyledTop>
      <TextContainer>
        <StyledTitle>rysolv</StyledTitle>
        <TextWrapper>Fixing the internet. One bug at a time.</TextWrapper>
      </TextContainer>
      <UrlWrapper>
        <StyledUrl href="https://github.com/rysolv" target="_blank">
          {GithubIcon}
        </StyledUrl>
        <StyledUrl href="https://facebook.com/rysolv" target="_blank">
          {FacebookIcon}
        </StyledUrl>
        <StyledUrl href="https://twitter.com/rysolv" target="_blank">
          {TwitterIcon}
        </StyledUrl>
      </UrlWrapper>
    </StyledTop>
    <Divider />
    <StyledBottom>
      <LinkContainer>
        <LinkWrapper onClick={() => handleNav('/terms-of-service')}>
          Terms & Conditions
        </LinkWrapper>
        <LinkWrapper onClick={() => handleNav('/privacy-policy')}>
          Privacy Policy
        </LinkWrapper>
        <LinkWrapper onClick={() => handleNav('/contact-us')}>
          Contact Us
        </LinkWrapper>
        <LinkWrapper onClick={() => handleNav('/faq')}>FAQ</LinkWrapper>
      </LinkContainer>
      <CopyrightWrapper>
        <div>{`© ${new Date().getFullYear()} Rysolv, LLC`}</div>
        <StyledText>|</StyledText>
        <div>All rights reserved</div>
      </CopyrightWrapper>
    </StyledBottom>
  </FooterWrapper>
);

Footer.propTypes = { handleNav: T.func.isRequired };

export default Footer;
