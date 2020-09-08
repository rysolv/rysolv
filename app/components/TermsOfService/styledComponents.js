import styled from 'styled-components';

import {
  defaultFontSize,
  headerFontSize,
  hoverLinkColor,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const ContentWrapper = styled.div`
  background: white;
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  padding: 2.6rem;
  width: 100%;
`;

export const LinkWrapper = styled.a`
  color: ${hoverLinkColor};

  &:hover {
    color: ${hoverLinkColor};
    text-decoration: underline;
  }
`;

export const StyledOrderedList = styled.ol`
  margin-bottom: 0;
  margin-top: 0;
`;

export const TermsOfServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;

  ${mobile} {
    margin: 0 1rem;
  }
`;

export const TermsOfServiceHeader = styled.div`
  color: ${textColor};
  display: flex;
  font-size: ${headerFontSize};
  margin: 5rem 0 2rem 0;
  width: 100%;

  ${mobile} {
    margin: 2rem 0;
  }
`;
