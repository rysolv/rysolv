import styled from 'styled-components';

import {
  defaultFontFamily,
  navyBlueColor,
  whiteColor,
} from 'defaultStyleHelper';
import { PrimaryButton } from 'components/base_ui';

import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, laptop } = mediaQueriesByDevice;

export const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;

  ${laptop} {
    flex-direction: column;
  }
`;

export const HiringContainer = styled.div`
  background-color: ${navyBlueColor};
  border-radius: 1rem;
  color: ${whiteColor};
  padding: 2rem 3rem 0;
  width: 100%;
`;

export const HiringHeader = styled.div`
  font-size: 3rem;
`;

export const HiringSubtitle = styled.div`
  font-family: monospace;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-style: ${defaultFontFamily};
  padding: 2rem;
  width: 100%;

  ${mobile} {
    padding: 0;
  }
`;

export const MessageHeader = styled.div`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  background: ${navyBlueColor};
  border: 0.2rem solid ${whiteColor};
  color: ${whiteColor};
  font-size: 1.4rem;
  text-transform: uppercase;

  &:hover {
    background: ${navyBlueColor};
  }
`;
