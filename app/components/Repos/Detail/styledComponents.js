import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  BaseTextInput,
  ErrorSuccessBanner,
  LanguageWrapper,
  PrimaryButton,
  SecondaryButton,
  Verified,
} from 'components/base_ui';
import {
  defaultFontSize,
  dividerBorder,
  hoverLinkColor,
  landingButtonGreen,
  lightBlueColor,
  subTextLightGrey,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, mobileS } = mediaQueriesByDevice;

export const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 75rem;
  overflow-y: auto;

  ${mobile} {
    max-height: 40rem;
  }
`;

export const ActivityDate = styled.div`
  color: ${subTextLightGrey};
  font-size: 90%;
  font-weight: 400;
  padding: 0.5rem 0;
  text-transform: uppercase;
`;

export const ActivityWrapper = styled.div`
  padding: 0 0 1.6rem 1.6rem;
`;

export const BaseInputWrapper = styled.div`
  margin-left: ${({ hasMargin }) => (hasMargin ? '2rem' : '0')};
  width: 45%;

  ${mobileS} {
    width: 85%;
  }
`;

export const BottomComponentsContainer = styled.div`
  display: flex;
  padding-top: 4rem;

  ${mobile} {
    flex-direction: column-reverse;
    justify-content: flex-end;
    padding-top: 3rem;
  }
`;

export const ButtonGroup = styled.div`
  align-self: flex-end;
`;

export const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 40rem;
  padding: ${({ hasPadding }) => (hasPadding ? '3rem 0' : '0')};
`;

export const ComponentsContainer = styled.div`
  background: white;
  padding: 2rem;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  width: 100%;

  ${mobile} {
    padding: 1rem 0 0;
  }
`;

export const Description = styled.div`
  color: ${subTextLightGrey};
  font-size: ${defaultFontSize};
  margin: 1rem 0;
  min-height: 4rem;
`;

export const DetailContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 90%;
`;

export const DetailViewContainer = styled.div`
  color: ${textColor};
  display: flex;
  padding: 1.6rem 0;
  width: 100%;

  ${mobile} {
    flex-direction: column;
  }
`;

export const Divider = styled.div`
  border-top: ${dividerBorder};
  display: ${({ shouldHide }) => (shouldHide ? 'none' : 'inherit')};
  margin: 3rem auto;
  width: 90%;
`;

export const EditLogoWrapper = styled.div`
  align-self: center;
  height: 15rem;
  position: relative;
`;

export const EmptyMessageComponent = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  flex: 1;
  font-size: ${defaultFontSize};
  justify-content: center;

  ${mobile} {
    height: 25rem;
  }
`;

export const FundContent = styled.div`
  font-size: ${defaultFontSize};
  line-height: 1.7rem;
  padding-left: 0.8rem;
  width: 100%;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Image = styled.img`
  align-self: center;
  height: 15rem;
  width: 15rem;
`;

export const LanguagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const MainComponents = styled.div`
  display: flex;
  width: 60%;

  ${mobile} {
    width: 100%;
  }
`;

export const Name = styled.div`
  align-items: center;
  display: flex;
  font-size: 2.6rem;
  font-weight: bold;
  letter-spacing: -1.2px;
  min-height: 3.2rem;
`;

export const NameWrapper = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;

export const OrganizationUrl = styled.a`
  align-items: center;
  display: flex;
  margin-left: ${({ isEdit }) => (isEdit ? '0' : '2rem')};
  width: 100%;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const PayoutButton = styled(PrimaryButton)`
  background-color: ${landingButtonGreen};
  margin: 1rem 0 0 1rem;

  &:hover {
    background-color: ${landingButtonGreen};
  }
`;

export const ProfileImageWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const RecentActivityContainer = styled.div`
  color: ${textColor};
  padding-left: 1.6rem;

  ${mobile} {
    padding: 0;
  }
`;

export const RepoDetailContainer = styled.div`
  width: 100%;
`;

export const RepoUrl = styled.a`
  align-items: center;
  display: flex;
  margin-left: 2rem;
  width: 100%;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const SidebarComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;

  ${mobile} {
    width: 100%;
  }
`;

export const StyledAction = styled.span``;

export const StyledBaseTextInput = styled(BaseTextInput)`
  margin: 0.5rem 0;
  width: ${({ width }) => width || 'inherit'};
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  width: 100%;
`;

export const StyledExternalLink = styled(Link)`
  color: ${hoverLinkColor};

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const StyledIcon = styled.div`
  border-radius: 50%;
  border: 1px solid grey;
  color: ${textColor};
  height: 3rem;
  margin-right: ${({ isEdit }) => (isEdit ? '1rem' : '0')};
  min-width: 3rem;

  svg {
    display: flex;
    height: 100%;
    margin: auto;
    width: 2rem;
  }
`;

export const StyledLanguage = styled(LanguageWrapper)`
  font-size: ${defaultFontSize};
  margin: 0 0.5rem 0.5rem 0;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  margin: 1rem 0 0;
`;

export const StyledSecondayButton = styled(SecondaryButton)`
  background-color: white;
  border: 0.1rem solid ${lightBlueColor};
  color: ${lightBlueColor};
  margin: 1rem 1rem 0 0;

  &:hover {
    background-color: white;
  }
`;

export const StyledTitle = styled.div`
  color: ${textColor};
  font-size: 1.8rem;
  padding-bottom: 2rem;
  text-transform: uppercase;
`;

export const StyledVerified = styled(Verified)`
  svg {
    height: 2rem;
    margin-left: 0.5rem;
    width: 2rem;
  }
`;

export const StyledWordLink = styled(Link)`
  font-weight: 700;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const SubHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

export const UrlWrapper = styled.div`
  color: ${textColor};
  display: flex;
`;
