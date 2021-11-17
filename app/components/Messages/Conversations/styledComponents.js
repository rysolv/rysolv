import styled from 'styled-components';

export const ConversationCard = styled.div`
  border-color: ${({ selected }) => (selected ? `blue` : `grey`)};
  border: 1px solid;
  height: 7rem;
  overflow: hidden;
  padding: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

export const ConversationContainer = styled.div`
  background-color: white;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 1rem;
  width: 100%;
`;

export const MessageDate = styled.div`
  color: grey;
`;

export const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MessageSnippit = styled.div`
  color: grey;
`;

export const Recipient = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
