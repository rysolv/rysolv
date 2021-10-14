import styled from 'styled-components';

import { textColor, defaultFontFamily } from 'defaultStyleHelper';

export const DashboardWrapper = styled.div`
  display: flex;
  padding: 2rem;
  color: ${textColor};
  font-family: ${defaultFontFamily};
  width: 100%;
`;

export const IssuesContainer = styled.div`
  /* background-color: grey; */
  height: 100rem;
  width: 100%;
  margin-top: 5rem;
`;

export const IssuesHeader = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;
export const IssuesSubtitle = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const LeftColumn = styled.div`
  width: 70%;
`;

export const ProfileColumn = styled.div`
  display: flex;
  height: 50rem;
  align-items: center;
  padding: 4rem 2rem;
  width: 30%;
  flex-direction: column;
`;

export const ProfileDetailContainer = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
`;

export const ProfileDetailItem = styled.div`
  font-size: 1.6rem;
  padding: 0.5rem;
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 25rem;
  width: 25rem;
`;
