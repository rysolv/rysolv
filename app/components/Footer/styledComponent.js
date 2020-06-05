import styled from 'styled-components';
import { detailFontSize } from 'defaultStyleHelper';

export const FooterWrapper = styled.footer`
  background-color: #607d8b;
  color: white;
  display: flex;
  flex-direction: row;
  font-size: ${detailFontSize};
  height: 10rem;
  margin-top: 15rem;
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
