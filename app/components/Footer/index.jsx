import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import {
  ButtonLink,
  ComponentContainer,
  ExternalLink,
  ExternalLinkWrapper,
  FooterContainer,
  InternalLink,
  InternalLinkWrapper,
  LinkColumn,
  LinkRow,
} from './styledComponent';

const DiscordIcon = iconDictionary('discord');
const FacebookIcon = iconDictionary('facebook');
const GithubIcon = iconDictionary('github');
const TwitterIcon = iconDictionary('twitter');

const Footer = () => (
  <ComponentContainer>
    <FooterContainer>
      <InternalLinkWrapper>
        <LinkColumn>
          <InternalLink label="Apply to jobs" path="/apply" />
          <InternalLink label="Contact us" path="/contact-us" />
          <InternalLink label="FAQ" path="/faq" />
        </LinkColumn>
        <LinkColumn>
          <InternalLink label="Pricing" path="/pricing" />
          <InternalLink label="Privacy policy" path="/privacy-policy" />
          <InternalLink label="Terms and conditions" path="/terms-of-service" />
        </LinkColumn>
      </InternalLinkWrapper>
      <ExternalLinkWrapper>
        <div>
          <ButtonLink
            aria-label="Join our discord server"
            href="https://discord.gg/kqt8RcVggN"
            rel="noopener"
            target="_blank"
          >
            {DiscordIcon} Join our server
          </ButtonLink>
        </div>
        <LinkRow>
          <ExternalLink href="https://github.com/rysolv" target="_blank">
            {GithubIcon}
          </ExternalLink>
          <ExternalLink href="https://twitter.com/rysolv" target="_blank">
            {TwitterIcon}
          </ExternalLink>
          <ExternalLink href="https://facebook.com/rysolv" target="_blank">
            {FacebookIcon}
          </ExternalLink>
        </LinkRow>
      </ExternalLinkWrapper>
    </FooterContainer>
  </ComponentContainer>
);

export default Footer;
