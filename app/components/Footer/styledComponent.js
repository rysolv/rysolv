import styled from 'styled-components';
import { detailFontSize } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const FooterWrapper = styled.footer`
  background-color: #607d8b;
  bottom: 0;
  color: white;
  display: flex;
  font-size: ${detailFontSize};
  height: 10rem;
  position: absolute;
  width: 100%;

  ${mobile} {
    flex-direction: column;
    justify-content: center;
  }
`;

export const StyledLeft = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding-left: 1rem;
  width: 50%;

  ${mobile} {
    padding-left: 0;
    place-content: center;
    width: 100%;
  }
`;

export const StyledRight = styled(StyledLeft)`
  justify-content: flex-end;
  padding-right: 1rem;

  ${mobile} {
    justify-content: flex-start;
    padding: 1rem 0;
    place-content: center;
    width: 100%;
  }
`;

export const StyledText = styled.div`
  padding: 0 1rem;
`;
