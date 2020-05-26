import styled from 'styled-components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';

import { ErrorSuccessBanner } from 'components/base_ui';
import { defaultFontSize } from 'defaultStyleHelper';

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const DetailViewContainer = styled.div`
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: row;
  padding: 1.6rem 0;
  width: 100%;
`;

export const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const IconButtonContainer = styled.div`
  align-self: center;
  height: 100%;
`;

export const Language = styled.div`
  align-items: center;
  display: flex;
  flex-flow: wrap;
`;

export const LanguageListItem = styled.div`
  display: flex;
  font-size: ${defaultFontSize};
  padding: 0.5rem 0;
  justify-content: space-between;
`;

export const LinkIcon = styled.div`
  padding-right: 0.5rem;

  svg {
    height: 1.8rem;
    width: 1.8rem;
  }
`;

export const LinksWrapper = styled.div`
  color: #6a737d;
  font-size: ${defaultFontSize};
  font-weight: bold;
  margin-left: 0.5rem;
`;

export const Name = styled.div`
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
`;

export const OneLink = styled.div`
  align-items: center;
  display: flex;
`;

export const OneLinkWrapper = styled.div`
  align-items: center;
  display: flex;
  padding: 0.5rem 0;
  justify-content: space-between;
`;

export const StyledA = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

export const Rep = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  margin: 0.5rem 0 0.5rem 0.5rem;
`;

export const SettingsTabsWrapper = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  margin-left: 2rem;
  overflow: hidden;
  padding: 2rem;
  width: 65rem;
`;

export const StyledLanguageAutocomplete = styled.div`
  width: 80%;
`;

export const StyledCancelIcon = styled.div`
  align-items: center;
  background-color: #ffcdd2;
  border-radius: 50%;
  color: #c62828;
  display: flex;
  height: 2.4rem;
  place-content: center;
  position: absolute;
  width: 2.4rem;
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  margin-top: 1.6rem;
  width: 100%;
`;

export const StyledExpansionPanel = styled(ExpansionPanel)`
  box-shadow: none;
  color: rgba(0, 0, 0, 0.7);

  &:before {
    background-color: white;
  }

  &.expanded {
    margin: 0rem;
  }

  .MuiExpansionPanelSummary-root {
    margin: 0;
    padding: 0;
  }

  .MuiExpansionPanelSummary-content {
    margin: 0;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  justify-content: center;
  padding: 0;
  width: 100%;
`;

export const StyledFundedIcon = styled.div`
  align-items: center;
  background-color: #c4efe0;
  border-radius: 50%;
  color: #31b589;
  display: flex;
  height: 2.4rem;
  place-content: center;
  position: absolute;
  width: 2.4rem;
`;

export const StyledGiftIcon = styled.div`
  align-items: center;
  background-color: rgb(236, 234, 252);
  border-radius: 50%;
  color: rgb(105, 8, 201);
  display: flex;
  height: 2.4rem;
  place-content: center;
  width: 2.4rem;
  position: absolute;
`;

export const StyledH3 = styled.h3`
  color: rgba(0, 0, 0, 0.87);
  font-size: 2rem;
  font-weight: 500;
  margin: 3rem 0;
`;

export const StyledPaper = styled(Paper)`
  box-shadow: none;
  width: 100%;
`;

export const StyledPullRequestIcon = styled.div`
  align-items: center;
  background-color: #fcdbc6;
  border-radius: 50%;
  color: #f47e34;
  display: flex;
  height: 2.4rem;
  place-content: center;
  position: absolute;
  width: 2.4rem;
`;

export const StyledTab = styled(Tab)`
  font-size: ${defaultFontSize};
  min-width: 9rem;
  padding: 0.6rem;
`;

export const UserCardWrapper = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  padding: 15px 2%;
  width: fit-content;
`;

export const UserImage = styled.img`
  margin: 0.5rem;
  max-height: 25rem;
  max-width: 25rem;
`;
