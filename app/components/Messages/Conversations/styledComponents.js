import styled from 'styled-components';

export const ConversationCard = styled.div`
  background-color: ${({ selected }) => (selected ? `#c3dfffa3` : `inherit`)};
  border-bottom: 1px solid grey;
  font-weight: ${({ unread }) => (unread ? `bold` : `inherit`)};
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
  margin-bottom: 0.5rem;
`;

export const Unread = styled.div`
  background-color: #9090f5;
  border-radius: 50%;
  display: ${({ unread }) => (unread ? `inline-flex` : `none`)};
  height: 1rem;
  width: 1rem;
`;
