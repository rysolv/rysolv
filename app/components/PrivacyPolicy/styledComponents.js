import styled from 'styled-components';

import {
  blueColor,
  lightBlueColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop } = mediaQueriesByDevice;

export const ContentWrapper = styled.div`
  color: ${textColor};
  font-size: 1.6rem;
`;

export const LinkWrapper = styled.a`
  color: ${lightBlueColor};

  &:hover {
    color: ${lightBlueColor};
  }
`;

export const PrivacyPolicyHeader = styled.div`
  align-self: center;
  color: ${blueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  padding: 2rem 0 1rem;
`;

export const StyledP = styled.p`
  font-weight: 400;
  line-height: 2.4rem;
`;

export const ViewContainer = styled.div`
  background: ${whiteColor};
  display: flex;
  flex-direction: column;
  padding: 5rem 12rem 5.6rem;
  width: 100%;

  ${laptop} {
    padding: 5rem 3rem 5.6rem;
  }
`;
