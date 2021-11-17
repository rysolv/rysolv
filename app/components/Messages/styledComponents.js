import styled from 'styled-components';

import {
  defaultFontFamily,
  defaultFontSize,
  textColor,
} from 'defaultStyleHelper';

// import { mediaQueriesByDevice } from 'utils/breakpoints';
// const { mobile, laptopS } = mediaQueriesByDevice;

export const ConversationWrapper = styled.div`
  display: flex;
  width: 30%;
`;

export const MessageContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 5rem;
  height: 100rem;
  font-size: ${defaultFontSize};
  font-family: ${defaultFontFamily};
  color: ${textColor};
`;

export const MessageWrapper = styled.div`
  display: flex;
  width: 50%;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
`;
