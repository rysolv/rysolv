import styled from 'styled-components';

import {
  borderColor,
  defaultFontSize,
  textColor,
  detailFontSize,
  codeGrey,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { tablet, laptop } = mediaQueriesByDevice;

export const CommmentWrapper = styled.div`
  margin: 3rem 0;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 2.5rem 0;

  ${tablet} {
    padding: 2.5rem 0;
  }
  ${laptop} {
    padding: 2.5rem 0;
  }
`;

export const Icon = styled.span`
  align-items: center;
  display: flex;
  margin-right: 0.5rem;
`;

export const Divider = styled.div`
  border-bottom: 1px solid ${borderColor};
  color: ${textColor};
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem 0;
  width: 100%;
`;

export const ExternalLinkWrapper = styled.a`
  color: rgba(0, 0, 0, 0.4);
  display: flex;
  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    color: #007bff;
    cursor: pointer;
  }
`;

export const IssueBodyContainer = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  border: none;
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  width: 100%;

  code {
    background-color: ${codeGrey};
    font-family: monospace;
    white-space: pre-wrap;
    border-bottom-left-radius: 2.5px;
    border-bottom-right-radius: 2.5px;
    color: ${textColor};
  }

  image {
    width: auto;
  }

  pre {
    background-color: ${codeGrey};
    padding: 0.5rem;
    max-height: 75rem;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

export const IssueBody = styled.div`
  font-size: ${defaultFontSize};
  min-height: 4rem;
  padding: 0 1rem;
  width: 100%;

  * {
    color: ${textColor};
    font-family: inherit;
    width: 100%;
  }
`;

export const IssueDetailColumn = styled.div`
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  ${tablet} {
    padding: 1rem;
  }
`;

export const IssueDetailWrapper = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  border: 0.1rem solid ${borderColor};
  display: inline-flex;
  min-height: 40vh;
  overflow: hidden;
  padding: 0 0 3rem 0;
`;

export const LanguagesWrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.4rem;
  padding: 2rem 0 1rem 0;
  margin: 0;
`;

export const LanguagesTitle = styled.div`
  color: ${textColor};
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0.02rem;
  line-height: 1.5;
  padding-right: 1rem;
`;

export const LeftPanel = styled.div`
  width: 3.5rem;
`;

export const PostingInfoWrapper = styled.div`
  align-items: center;
  border-bottom: 1px solid ${borderColor};
  color: ${textColor};
  display: flex;
  font-size: ${detailFontSize};
  justify-content: space-between;
  padding: 0.4rem 0;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding: 0 1rem;
  ${laptop} {
    display: none;
  }
`;

export const UsernameLink = styled.a`
  display: inline;
  font-weight: bold;

  &:hover {
    color: #007bff;
  }
`;

export const TopBarWrapper = styled.div`
  background-color: #f6f8fa;
  height: 10rem;
`;
