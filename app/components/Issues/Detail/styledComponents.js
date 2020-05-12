import styled from 'styled-components';
import { borderColor, subheaderFontSize, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';
const { tablet, laptop } = mediaQueriesByDevice;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 2.5rem 5rem;

  ${tablet} {
    padding: 2.5rem 0;
  }
  ${laptop} {
    padding: 2.5rem 0;
  }
`;

export const IssueDetailWrapper = styled.div`
  width: 70%;
  display: inline-flex;
  background-color: white;
  border-radius: 0.25rem;
  min-height: 40vh;
  padding: 0 3rem 3rem 0;
  ${laptop} {
    width: 80%;
    padding: 0;
  }
  ${tablet} {
    padding: 0;
    width: 100%;
  }
`;

export const LeftPanel = styled.div`
  width: 5rem;
`;

export const IssueDetailColumn = styled.div`
  flex-direction: column;
  width: 100%;
  padding: 1rem 2rem 2rem 2rem;
  ${tablet} {
    padding: 0.5rem;
  }
`;

export const SidebarContainer = styled.div`
  display: inline-flex;
  width: 20%;
  padding: 0 1rem;
  ${tablet} {
    display: none;
  }
`;

export const Divider = styled.div`
  border-bottom: 1px solid ${borderColor};
  color: ${textColor};
  font-family: inherit;
  margin: 1rem 0;
  font-size: ${subheaderFontSize};
  width: 100%;
`;
