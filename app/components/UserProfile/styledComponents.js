import styled, { css } from 'styled-components';

import {
  darkBlueColor,
  defaultFontSize,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

import { PrimaryButton } from 'components/base_ui';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop, tablet } = mediaQueriesByDevice;

export const AboutContainer = styled.div`
  background: #f5f5f5;
  border-radius: 0.5rem;
  font-family: monospace;
  margin-bottom: 3rem;
  min-height: 10rem;
  padding: 3rem;
  width: 100%;
`;

const baseButtonStyle = css`
  align-items: center;
  border-radius: 0.8rem;
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height: 1.936rem;
  text-transform: initial;
`;

export const ContentColumn = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 5rem;
  width: 70%;

  ${tablet} {
    padding: 3rem 0;
    width: 100%;
  }
`;

export const DetailCharts = styled.div`
  display: flex;

  ${laptop} {
    flex-direction: column;
  }
`;

export const IconLink = styled.a`
  margin: 0 1rem;

  svg {
    height: 2.5rem;
    width: 2.5rem;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const LocationIconWrapper = styled.div`
  svg {
    height: 2.5rem;
    width: 2.5rem;
  }
`;

export const LocationWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 2rem;
`;
export const LocationName = styled.div``;

export const ProfileColumn = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  width: 30%;

  ${tablet} {
    padding: 0;
    width: 100%;
  }
`;

export const ProfilePic = styled.img`
  border-radius: 50%;
  border: 0.2rem solid ${whiteColor};
  height: 25rem;
  width: 25rem;

  ${laptop} {
    height: 20rem;
    width: 20rem;
  }

  ${tablet} {
    height: 15rem;
    width: 15rem;
  }
`;

export const ProfileSection = styled.section`
  width: 100%;
`;

export const RoleContainer = styled.div`
  text-align: center;
`;

export const SocialLinkWrapper = styled.div`
  display: flex;
  margin: 1rem 0;
`;

export const StyledHeader = styled.h3`
  color: ${darkBlueColor};
  font-size: 2.2rem;
  font-weight: 700;
  width: 100%;
`;

export const StyledName = styled.h1`
  color: ${darkBlueColor};
  font-size: 3.2rem;
  font-weight: 700;
  margin: 2rem 0 0;
  text-align: center;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  ${baseButtonStyle};
  background-color: ${darkBlueColor};
  color: ${whiteColor};

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;

export const StyledSubtitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 400;
  margin: 1rem 0;
  text-align: center;
`;

export const UserProfileContainer = styled.div`
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  width: 100%;

  ${tablet} {
    flex-direction: column;
  }
`;
