import styled from 'styled-components';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

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

export const ContributorsSearchHeaderContainer = styled.div`
  margin-bottom: 2rem;
  width: 100%;
`;
