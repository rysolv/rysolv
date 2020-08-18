import styled from 'styled-components';

import {
  borderColor,
  defaultFontSize,
  headerFontSize,
  hoverLinkColor,
  lightBlueColor,
  subHeaderColor,
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
  background-color: white;
  border-radius: 0.5rem;
  border: 0.1rem solid ${borderColor};
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

export const LogoContainer = styled.img`
  display: inline-flex;
  height: 5rem;
  margin: 0 1rem 0 0;
  width: 5rem;
`;

export const OrganizationNameWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

export const SelectedOrganization = styled.div`
  margin: 0.5rem 0;
  font-size: ${headerFontSize};
`;

export const StyledFocusDiv = styled.div`
  &:focus {
    outline: none;
  }
`;

export const StyledH3 = styled.h3`
  color: ${subHeaderColor};
  margin-bottom: 0;
  padding: 1rem 2rem;
`;

export const StyledLink = styled.a`
  color: ${lightBlueColor};
  font-size: ${defaultFontSize};

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;

export const VerifyWrapper = styled.div`
  padding: 0 2rem;
`;
