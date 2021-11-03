import styled from 'styled-components';

import {
  textColor,
  defaultFontFamily,
  blueColor,
  whiteColor,
} from 'defaultStyleHelper';
import { PrimaryButton } from 'components/base_ui';

import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, laptop } = mediaQueriesByDevice;

export const HiringContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;

  ${laptop} {
    flex-direction: column;
  }
`;

export const HiringHeader = styled.div`
  font-size: 3rem;
  margin-top: 3rem;
`;

export const HiringSubtitle = styled.div`
  font-family: monospace;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const MessageContainer = styled.div`
  color: ${textColor};
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
  background: ${blueColor};
  border: 0.2rem solid ${blueColor};
  color: ${whiteColor};
  font-size: 1.4rem;
  text-transform: uppercase;

  &:hover {
    background: ${blueColor};
  }
`;
