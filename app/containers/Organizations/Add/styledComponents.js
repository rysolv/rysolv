import styled from 'styled-components';

import { CheckboxWithLabel } from 'components/base_ui';
import {
  borderColor,
  defaultFontSize,
  hoverLinkColor,
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
  border: 0.1rem solid ${borderColor};
  width: 80%;
  padding: 1rem;
  border-radius: 0.5rem;

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
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const StyledCheckboxWithLabel = styled(CheckboxWithLabel)`
  color: ${textColor};
  padding: 0.9rem 0.9rem 0.9rem 0;
`;

export const StyledH3 = styled.h3`
  color: ${subHeaderColor};
  padding: 1rem 2rem;
`;

export const Wrapper = styled.div`
  padding: 0 2.5rem;
`;
