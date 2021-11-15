import styled from 'styled-components';

import {
  defaultFontFamily,
  defaultFontSize,
  subTextLightGrey,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, laptopS } = mediaQueriesByDevice;

export const BioContainer = styled.div`
  background-color: #d1d1d1;
  border-radius: 1rem;
  font-size: 1.4rem;
  height: 20rem;
  margin-bottom: 2rem;
  padding: 2rem;
  width: 100%;
`;

export const DetailColumn = styled.div`
  width: 65%;

  ${laptopS} {
    width: 100%;
  }
`;

export const LinkIcon = styled.div`
  padding-right: 0.5rem;

  svg {
    height: 1.8rem;
    width: 1.8rem;
  }
`;

export const LinksWrapper = styled.div`
  color: ${subTextLightGrey};
  font-size: ${defaultFontSize};
  font-weight: bold;
  margin-left: 0.5rem;
  width: 100%;
`;

export const OneLinkWrapper = styled.div`
  display: flex;
  padding: 0.5rem 0;
`;

export const StyledA = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

export const ProfileColumn = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0rem 2rem 4rem;

  ${laptopS} {
    width: 100%;
  }

  ${mobile} {
    padding: 2rem 0;
  }
`;

export const ProfileContainer = styled.div`
  color: ${textColor};
  display: flex;
  font-family: ${defaultFontFamily};
  height: auto;
  justify-content: space-evenly;
  padding: 4rem 2rem 0;
  width: 100%;

  ${laptopS} {
    flex-direction: column;
  }
`;

export const ProfileDetailItem = styled.div`
  font-size: 2.4rem;
  margin: 1rem 0;
  width: 100%;
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 25rem;
  width: 25rem;

  ${mobile} {
    height: 15rem;
    width: 15rem;
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 2rem;
`;

export const StatsContainer = styled.div`
  background-color: #d1d1d1;
  border-radius: 1rem;
  height: 18rem;
  width: 18rem;
`;

export const StatsRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

export const WorkStatus = styled.div`
  background-color: #31b589;
  border-radius: 0.8rem;
  color: ${whiteColor};
  font-family: 'Roboto', 'Helvetica', 'Arial', 'sans-serif';
  font-size: 1.4rem;
  font-weight: 400;
  height: 4.2rem;
  line-height: 4.2rem;
  margin: 1rem 0;
  text-align: center;
  width: 100%;
`;
