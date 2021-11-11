import styled from 'styled-components';
import { PrimaryButton } from 'components/base_ui';

import { textColor, defaultFontFamily, blueColor } from 'defaultStyleHelper';

import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, laptopS } = mediaQueriesByDevice;

export const ButtonContainer = styled.div`
  padding-top: 3rem;
  text-align: center;
`;

export const DashboardWrapper = styled.div`
  color: ${textColor};
  display: flex;
  font-family: ${defaultFontFamily};
  height: auto;
  justify-content: space-evenly;
  padding: 6rem 2rem 0;
  width: 100%;

  ${laptopS} {
    flex-direction: column-reverse;
  }
`;

export const IssuesContainer = styled.div`
  margin-top: 5rem;
`;

export const IssuesHeader = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;
export const IssuesSubtitle = styled.div`
  font-family: monospace;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const LeftColumn = styled.div`
  width: 65%;

  ${laptopS} {
    width: 100%;
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

export const StyledPrimaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 0.2rem solid ${blueColor};
  color: ${blueColor};
  font-size: 1.4rem;
  text-transform: uppercase;

  &:hover {
    background: transparent;
  }
`;
