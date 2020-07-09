import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import {
  BottomParagraph,
  ContactContainer,
  ContactHeader,
  EmailContainer,
  IconWrapper,
  LinkWrapper,
  MiddleParagraph,
  TopParagraph,
} from './styledComponents';

const EmailIcon = iconDictionary('email');

const Contact = () => (
  <ContactContainer>
    <ContactHeader>Contact Us</ContactHeader>
    <div>
      <EmailContainer>
        <IconWrapper>{EmailIcon}</IconWrapper>
        <TopParagraph>
          Don&apos;t hesitate to contact us if we can help with anything.
          <br />
          We&apos;d love to hear from you.
        </TopParagraph>
        <MiddleParagraph>
          Please e-mail us at{' '}
          <LinkWrapper href="mailto: support@rysolv.com">
            support@rysolv.com
          </LinkWrapper>{' '}
          with questions or feedback.
        </MiddleParagraph>
        <BottomParagraph>
          Found a bug? Let us know. Just{' '}
          <LinkWrapper
            href="https://github.com/rysolv/rysolv/issues"
            target="_blank"
          >
            raise an issue
          </LinkWrapper>
          .
        </BottomParagraph>
      </EmailContainer>
    </div>
  </ContactContainer>
);

export default Contact;
