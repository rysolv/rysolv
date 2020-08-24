import styled from 'styled-components';

import {
  borderColor,
  defaultFontSize,
  detailFontSize,
  headerFontSize,
  hoverLinkColor,
  lightBlueColor,
  subheaderFontSize,
  textColor,
} from 'defaultStyleHelper';

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderWrapper = styled.div`
  display: flex;
`;

export const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ImportFormContainer = styled.section`
  color: ${textColor};
  font-size: 2.4rem;
  font-weight: 300;
  height: 50%;
  line-height: 4rem;
  margin: auto;
  padding: 4rem 2rem;
  text-align: center;
  width: 80%;

  * {
    font-size: ${defaultFontSize};
  }

  .MuiFormHelperText-root {
    font-size: ${detailFontSize};
  }

  &:focus {
    outline: none;
  }
`;

export const InputFormWrapper = styled.div`
  padding: 0 6.5rem;
`;

export const LogoContainer = styled.img`
  display: inline-flex;
  height: 7rem;
  margin: 0 2rem 0 0;
  width: 7rem;
`;

export const OrganizationNameWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

export const SelectedOrganization = styled.div`
  margin: 0.5rem 0;
  font-size: ${headerFontSize};
`;

export const StyledImportError = styled.div`
  color: red;
  font-size: ${detailFontSize};
  line-height: ${defaultFontSize};
  padding: 0;
  text-align: left;
`;

export const StyledLabel = styled.div`
  color: ${lightBlueColor};
  font-size: ${subheaderFontSize};

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
export const StyledLink = styled.a`
  color: ${lightBlueColor};
  font-size: ${defaultFontSize};

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;

export const ValueWrapper = styled.div`
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  padding: 1rem 0;
`;

export const VerifyWrapper = styled.div`
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  margin: 0 0 4rem 0;
  padding: 1rem;
`;
