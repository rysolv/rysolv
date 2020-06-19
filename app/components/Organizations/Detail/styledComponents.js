import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';

import {
  BaseDropDownMenu,
  BaseTextInput,
  ErrorSuccessBanner,
  PrimaryButton,
  SecondaryButton,
} from 'components/base_ui';
import {
  defaultFontSize,
  detailFontSize,
  dividerBorder,
  hoverLinkColor,
  hyperlinkColor,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  padding-left: 0;
`;

export const ActivityDate = styled.div`
  color: ${textColor};
  font-size: ${detailFontSize};
  text-transform: uppercase;
  text-align: right;
  padding: 0.5rem 0;
`;

export const ActivityWrapper = styled.div`
  padding: 0.5rem 1rem;
`;

export const BaseInputWrapper = styled.div`
  margin-left: ${({ hasMargin }) => (hasMargin ? '4rem' : '0')};
  width: 45%;
`;

export const ButtonGroup = styled.div`
  ${mobile} {
    display: flex;
    flex-flow: wrap-reverse;
    justify-content: flex-end;
    width: 50%;
  }
`;

export const ContentWrapper = styled.div`
  padding-left: 2rem;
  width: 100%;
`;

export const ContributorContent = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContributorDetails = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  line-height: 1.5;
  margin: 1.6rem 1rem;
`;

export const ContributorImageWrapper = styled.div`
  align-items: center;
  display: flex;
  margin: 1.6rem 0 1.6rem 1rem;
`;

export const ContributorListItem = styled.li`
  border-top: 0.1rem solid #d5d5d5;
  display: flex;
  width: 90%;

  & :last-child {
    border-bottom: 0.1rem solid #d5d5d5;
  }
`;

export const ContributorName = styled.span`
  color: #0366d6;
  font-size: 1.6rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ContributorsList = styled.ul``;

export const ContributorsSearchHeaderContainer = styled.div`
  margin: 3em 0;
  width: 100%;
`;

export const Description = styled.div`
  color: #6a737d;
  font-size: ${defaultFontSize};
  margin-bottom: 2rem;
  text-align: justify;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

export const DetailViewContainer = styled.div`
  color: ${textColor};
  display: flex;
  padding: 1.6rem 0;
  width: 100%;
`;

export const Divider = styled.div`
  display: ${({ shouldHide }) => (shouldHide ? 'none' : 'inherit')};
  border-top: ${dividerBorder};
  margin: 1rem auto;
  width: 90%;
`;

export const EditLogoWrapper = styled.div`
  height: 10rem;
  position: relative;
`;

export const EmptyMessageComponent = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  height: 100%;
  justify-content: center;
`;

export const FundContent = styled.div`
  width: 100%;
  font-size: ${defaultFontSize};
  padding-left: 0.8rem;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Icon = styled.div`
  align-items: center;
  color: ${({ color }) => color || 'blue'};
  display: flex;
  margin-right: 0.25rem;

  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`;

export const Image = styled.img`
  height: 10rem;
  width: 10rem;
`;

export const IssueAttempts = styled.div`
  align-self: center;
  color: #6a737d;
  margin-left: 1rem;
`;

export const IssueContent = styled.div`
  display: flex;
  width: 100%;
  height: 10rem;
  margin: 1rem 0;

  ${mobile} {
    height: auto;
  }
`;

export const IssueContentInfo = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: column;
  flex: 100%;
`;

export const IssueDetail = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

export const IssueFundedAmount = styled.div`
  align-self: center;
  color: ${textColor};
  display: flex;
  font-size: 1.8rem;
  font-weight: 500;
  justify-content: flex-end;
  white-space: nowrap;
  width: 30%;
`;

export const IssuesList = styled.ul`
  padding: 0 2rem;
`;

export const IssueListItem = styled.li`
  border-top: 0.1rem solid #d5d5d5;
  display: flex;
  width: 100%;

  & :last-child {
    border-bottom: 0.1rem solid #d5d5d5;
  }
`;

export const IssueModifiedDate = styled.div`
  align-self: flex-end;
  font-size: 1.2rem;
`;

export const IssueName = styled.a`
  font-size: 1.4rem;

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
  }
`;

export const IssueNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 1.5rem;
`;

export const IssueOpen = styled.div`
  background-color: ${({ open }) =>
    open ? 'rgb(229, 251, 242)' : 'rgb(237, 238, 240)'};
  border-radius: 0.25rem;
  color: ${({ open }) => (open ? 'rgb(8, 178, 110)' : '0')};
  display: inline-block;
  font-weight: 700;
  line-height: 1.5;
  padding: 0.25rem 0.4rem;
  white-space: nowrap;
`;

export const IssueOpenWrapper = styled.div`
  display: flex;
  font-size: 1.2rem;
`;

export const IssuesSearchHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  padding: 0 2rem;
  width: 100%;
`;

export const Language = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: 1.4rem;
  padding: 0 1rem 1rem 0;
  white-space: nowrap;
`;

export const LanguageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const MainTabs = styled.div`
  display: flex;
  width: 60%;

  ${mobile} {
    width: 100%;
  }
`;

export const Name = styled.div`
  align-items: center;
  display: flex;
  font-size: 2rem;
  font-weight: 400;
  min-height: 3.2rem;
`;

export const NameWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const OrganizationUrl = styled.a`
  align-items: center;
  display: flex;
  margin-right: 2rem;
  width: ${({ width }) => width || 'inherit'};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ProfileImageWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const RecentActivityContainer = styled.div`
  color: ${textColor};
  padding: 1.6rem;
`;

export const RepoUrl = styled.a`
  align-items: center;
  display: flex;
  margin-right: 2rem;
  width: ${({ width }) => width || 'inherit'};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const SidebarTabs = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;

  ${mobile} {
    width: 100%;
  }
`;

export const StyledAction = styled.span``;

export const StyledBaseDropDownMenu = styled(BaseDropDownMenu)`
  margin: 0 1rem;

  ${mobile} {
    margin: 0;
  }
`;

export const StyledBaseTextInput = styled(BaseTextInput)`
  margin: 0.5rem 0;
  width: ${({ width }) => width || 'inherit'};
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  width: 100%;
`;

export const StyledIcon = styled.div`
  color: ${textColor};
  padding-right: 0.5rem;

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledLanguageAutocomplete = styled.div`
  margin: 0 -1rem;
  width: 100%;
`;

export const StyledPaper = styled(Paper)`
  box-shadow: none;
  width: 100%;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  margin-right: 0;
`;

export const StyledSecondayButton = styled(SecondaryButton)`
  background-color: white;
  border: 0.1rem solid #1e88e5;
  color: #1e88e5;

  &:hover {
    background-color: white;
  }

  ${mobile} {
    margin-right: 0;
  }
`;

export const StyledTab = styled(Tab)`
  font-size: ${defaultFontSize};
`;

export const StyledTitled = styled.div`
  font-size: 1.8rem;
  padding-bottom: 1rem;
`;

export const StyledWordLink = styled(Link)`
  display: inline;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const StyledExternalLink = styled(Link)`
  color: ${hyperlinkColor};
  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;

export const TabsContainer = styled.div`
  background-color: white;
  display: flex;
  min-height: 50rem;
  width: 100%;

  ${mobile} {
    flex-direction: column-reverse;
  }
`;

export const TopLanguagesContainer = styled.div`
  color: ${textColor};
  padding: 1.6rem;
  width: 100%;
`;

export const VerifiedWrapper = styled.div`
  background-color: rgb(229, 251, 242);
  border-radius: 0.5rem;
  border: 0.1rem solid rgba(27, 31, 35, 0.15);
  color: rgb(8, 178, 110);
  height: fit-content;
  padding: 0.5rem;
  margin: 0 2rem;
`;

export const UrlWrapper = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: row;
  font-size: 1.4rem;

  ${mobile} {
    flex-direction: column;
    margin-left: -12rem;
  }
`;
