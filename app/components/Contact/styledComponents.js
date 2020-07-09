import styled from 'styled-components';

import { defaultFontSize, headerFontSize, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const BottomParagraph = styled.p``;

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${mobile} {
    margin: 0 1rem;
  }
`;

export const ContactHeader = styled.div`
  color: ${textColor};
  display: flex;
  font-size: ${headerFontSize};
  margin: 5rem 0 2rem 0;
  width: 100%;

  ${mobile} {
    margin: 2rem 0;
  }
`;

export const EmailContainer = styled.div`
  background: white;
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  min-height: 50rem;
  padding: 3.8rem 2.6rem;
  text-align: center;
  width: 100%;
`;

export const IconWrapper = styled.div`
  align-self: center;
  background: #bbdefb;
  border-radius: 50%;
  height: 5rem;
  width: 5rem;

  svg {
    color: #1976d2;
    height: 4rem;
    margin: 0.5rem auto;
    width: 4rem;
  }
`;

export const LinkWrapper = styled.a`
  color: #007bff;

  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;

export const MiddleParagraph = styled.p``;

export const TopParagraph = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  padding-top: 2rem;
`;
