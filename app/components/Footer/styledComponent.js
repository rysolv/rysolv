import styled from 'styled-components';

import { detailFontSize } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const CopyrightWrapper = styled.div`
  display: flex;
`;

export const Divider = styled.div`
  border-top: 0.2rem solid #f6f8fa;
  margin: 1rem auto;
  width: 100%;
`;

export const FooterWrapper = styled.footer`
  background-color: #607d8b;
  bottom: 0;
  color: #f6f8fa;
  display: flex;
  flex-direction: column;
  font-size: ${detailFontSize};
  padding: 3.6rem 5%;
  position: absolute;
  width: 100%;

  ${mobile} {
    flex-direction: column;
    justify-content: center;
  }
`;

export const LinkContainer = styled.div`
  padding: 1rem 1rem 2.4rem 1rem;
`;

export const LinkWrapper = styled.a`
  font-size: 16px;
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledTop = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 1rem;
  width: 100%;

  ${mobile} {
    place-content: center;
  }
`;

export const StyledBottom = styled(StyledTop)`
  flex-direction: column;
  place-content: center;

  ${mobile} {
    width: 100%;
  }
`;

export const StyledText = styled.div`
  padding: 0 1rem;
`;

export const StyledTitle = styled.div`
  font-size: 2.2rem;
  padding: 1rem;
`;

export const StyledUrl = styled.a`
  padding: 1.5rem;

  &:hover {
    cursor: pointer;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const TextContainer = styled.div`
  text-align: center;
`;
