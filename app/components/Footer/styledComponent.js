import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  height: 5rem;
  width: 100%;
`;

export const StyledLeft = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding-left: 1rem;
  width: 50%;
`;

export const StyledRight = styled(StyledLeft)`
  justify-content: flex-end;
  padding-right: 1rem;
`;

export const StyledText = styled.div`
  padding: 0 1rem;
`;
