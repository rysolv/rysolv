import styled from 'styled-components';

import { detailFontSize, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, mobileXS } = mediaQueriesByDevice;

export const CopyrightWrapper = styled.div`
  color: lightgrey;
  display: flex;
`;

export const Divider = styled.div`
  border-top: 0.2rem solid ${textColor};
  margin: 2rem auto 1rem;
  width: 100%;
`;

export const FooterWrapper = styled.footer`
  bottom: 0;
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: ${detailFontSize};
  padding: 0 5% 1.6rem 5%;
  position: absolute;
  width: 100%;

  ${mobile} {
    flex-direction: column;
    justify-content: center;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem 1rem 2.4rem 1rem;
`;

export const LinkWrapper = styled.a`
  font-size: 1.6rem;
  padding: 0 3rem;
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
`;

export const StyledBottom = styled(StyledTop)`
  flex-direction: column;
  padding-left: 0;
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
  letter-spacing: 0.1rem;
  padding: 1rem 1rem 1rem 0;
  text-align: start;
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

  ${mobileXS} {
    padding: 0.5rem;
  }
`;

export const TextContainer = styled.div`
  text-align: center;
`;
