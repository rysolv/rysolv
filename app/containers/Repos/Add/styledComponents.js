import styled from 'styled-components';

import { ErrorSuccessBanner } from 'components/base_ui';
import {
  borderColor,
  defaultFontSize,
  headerColor,
  hoverLinkColor,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { desktop, desktopL, laptop, mobile, tablet } = mediaQueriesByDevice;

export const AddWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 2.5%;
  width: 100%;
`;

export const AddForm = styled.div`
  background-color: ${({ isVerify }) => (isVerify ? 'transparent' : 'white')};
  border-radius: ${({ isVerify }) => (isVerify ? '0' : '0.5rem')};
  border: ${({ isVerify }) =>
    isVerify ? 'none' : `0.1rem solid ${borderColor}`};
  margin-top: 1.5rem;
  padding: 1rem;
  width: 80%;

  ${desktopL} {
    width: 70%;
  }
  ${desktop} {
    width: 70%;
  }
  ${laptop} {
    width: 90%;
  }
  ${tablet} {
    width: 90%;
  }
  ${mobile} {
    width: 100%;
  }

  .MuiFormControl-root {
    margin: 0 1rem;
    width: 100%;
  }
`;

export const BackLink = styled.div`
  color: ${textColor};
  display: inline-flex;
  font-size: ${defaultFontSize};
  margin: 0 3rem;
  vertical-align: middle;

  :hover {
    color: ${hoverLinkColor};
    cursor: pointer;
  }
`;

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  margin-bottom: 1rem;
  width: 80%;

  ${desktopL} {
    width: 70%;
  }
  ${desktop} {
    width: 70%;
  }
  ${laptop} {
    width: 90%;
  }
  ${tablet} {
    width: 90%;
  }
  ${mobile} {
    width: 100%;
  }
`;

export const StyledFocusDiv = styled.div`
  &:focus {
    outline: none;
  }
`;

export const StyledH3 = styled.h3`
  color: ${headerColor};
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
  padding: ${({ isFirstHeader }) =>
    isFirstHeader ? '0 0 1rem' : '2rem 0 1rem'};
`;
