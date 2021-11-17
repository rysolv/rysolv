import styled from 'styled-components';
import { PrimaryAsyncButton } from 'components/base_ui';
import Markdown from 'components/Markdown';

import { styledScrollbar } from 'defaultStyleHelper';

export const BodyWrapper = styled.div`
  border: 1px solid grey;
  padding: 1rem;
  width: 70%;
  margin: 1rem;
  border-radius: 1rem;
`;

export const MessageCard = styled.div`
  justify-content: ${({ active }) => (active ? `end` : `start`)};
  display: flex;
  flex-direction: ${({ active }) => (active ? `row` : `row-reverse`)};
  padding: 1rem;
  width: 100%;
  align-items: center;
`;

export const MessageContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ${styledScrollbar}
`;

export const MessageDate = styled.div``;

export const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MessageBody = styled.div``;

export const MessageWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  border: 1px solid grey;
  margin: 1rem;
  padding: 2rem;
  flex-direction: column;
  background-color: white;
`;

export const ProfilePicture = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

export const StyledAsyncButton = styled(PrimaryAsyncButton)`
  width: 50%;
  align-self: end;
`;

export const StyledMarkdown = styled(Markdown)`
  width: 100%;
  height: 100%;
`;

export const TextInput = styled.div`
  width: 100%;
  height: 30%;
`;

export const Username = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
