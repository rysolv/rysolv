import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

import { defaultFontSize, dividerBorder } from 'defaultStyleHelper';

export const BaseInputWrapper = styled.div`
  margin: 0 4rem;
  width: 45%;
`;

export const CompanyUrl = styled.div`
  align-items: center;
  display: flex;
  margin-right: 2rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ContentWrapper = styled.div`
  padding-left: 2rem;
`;

export const ContributorContent = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContributorDetails = styled.div`
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  line-height: 1.5;
  margin: 1.6rem 1rem;
`;

export const ContributorImage = styled.img`
  border-radius: 50%;
  height: 4.8rem;
  margin: 1.6rem 0 1.6rem 1rem;
  width: 4.8rem;
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
  margin: 2.4rem 0;
  width: 100%;
`;

export const Description = styled.div`
  color: #6a737d;
  font-size: ${defaultFontSize};
  margin-bottom: 2rem;
`;

export const DetailViewContainer = styled.div`
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  padding-top: 1.6rem;
  width: 100%;
`;

export const Divider = styled.div`
  border-top: ${dividerBorder};
  margin: 1rem auto;
  width: 90%;
`;

export const FundContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  padding-left: 0.8rem;
`;

export const FundDate = styled.div`
  color: #6a737d;
  text-transform: uppercase;
  padding: 0.5rem 0;
`;

export const FundSentence = styled.div`
  line-height: 2rem;
  width: 90%;
`;

export const FundsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  padding-left: 0;
`;

export const FundWrapper = styled.div`
  display: flex;
  padding: 1.2rem 2rem;
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

export const Language = styled.div`
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  padding-right: 1rem;
  font-size: 1.4rem;
`;

export const LanguageWrapper = styled.div`
  display: flex;
`;

export const MainTabs = styled.div`
  display: flex;
  width: 60%;
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
  display: flex;
  margin-bottom: 1rem;
`;

export const RecentActivityContainer = styled.div`
  color: rgba(0, 0, 0, 0.7);
  padding: 1.6rem;
`;

export const RepoUrl = styled.div`
  align-items: center;
  display: flex;
  margin-right: 2rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const SidebarTabs = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

export const StyledIcon = styled.div`
  color: rgba(0, 0, 0, 0.7);
  padding-right: 0.5rem;

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledPaper = styled(Paper)`
  box-shadow: none;
  width: 100%;
`;

export const StyledTitled = styled.div`
  font-size: 1.8rem;
  padding-bottom: 2rem;
`;

export const StyledWord = styled.span`
  font-weight: 500;
`;

export const StyledWordLink = styled(StyledWord)`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  background-color: white;
`;

export const TopLanguagesContainer = styled.div`
  color: rgba(0, 0, 0, 0.7);
  padding: 1.6rem;
  width: fit-content;
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
  color: #24292e;
  display: flex;
  flex-direction: row;
  font-size: 1.2rem;
`;

export const UserImage = styled.img`
  align-self: center;
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
`;
