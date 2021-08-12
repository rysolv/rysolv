import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ImageWrapper } from 'components/base_ui';
import {
  defaultFontSize,
  headerFontSize,
  hoverLinkColor,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, tablet } = mediaQueriesByDevice;

export const HeaderDescription = styled.div`
  width: 85%;

  ${tablet} {
    width: 100%;
  }
`;

export const HeaderWrapper = styled.div`
  color: ${textColor};
  font-size: ${headerFontSize};
  margin: 5rem 0 2rem 0;
  text-align: left;
  width: 100%;

  ${mobile} {
    margin: 2rem 0;
  }
`;

export const LogoWrapper = styled.div`
  text-align: center;

  svg {
    height: 12rem;
    width: 12rem;
  }

  ${tablet} {
    text-align: center;

    svg {
      height: 10rem;
      width: 10rem;
    }
  }

  ${mobile} {
    margin-bottom: -2rem;
  }
`;

export const StepContainer = styled.div`
  background-color: white;
  color: ${textColor};
  padding: 4rem 3.8rem 0;

  ${mobile} {
    padding: 2rem 2rem 0;
  }
`;

export const StepContentWrapper = styled.div`
  margin-right: 1.5rem;
  width: 60%;

  ${tablet} {
    margin-right: 0;
    width: 100%;
  }
`;

export const StepDescription = styled.div`
  font-size: ${defaultFontSize};
  line-height: 1.5em;

  a {
    color: ${hoverLinkColor};
  }

  ${mobile} {
    margin: 0 0 1rem 0;

    ul {
      padding-inline-start: 2rem;
    }
  }
`;

export const StepIconWrapper = styled.div`
  align-self: center;
  width: 25%;

  ${tablet} {
    width: 100%;
  }
`;

export const StepImageWrapper = styled.div`
  align-self: center;
  text-align: center;
  width: 40%;

  ${tablet} {
    width: 90%;
  }
`;

export const StepName = styled.div`
  font-size: 2.2rem;
  font-weight: 400;
  line-height: 1.5em;
  margin: 0 0 1rem 0;
`;

export const StepWrapper = styled.div`
  display: flex;
  margin-bottom: 4rem;

  ${tablet} {
    flex-direction: column;
  }
`;

export const StyledExternalLink = styled.a`
  color: ${hoverLinkColor};

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledHowContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;

  ${mobile} {
    margin: 0 1rem;
  }
`;

export const StyledImageWrapper = styled(ImageWrapper)`
  box-shadow: none;
  height: auto;
  width: 100%;
`;

export const StyledInternalLink = styled(Link)`
  color: ${hoverLinkColor};

  &:hover {
    text-decoration: underline;
  }
`;
