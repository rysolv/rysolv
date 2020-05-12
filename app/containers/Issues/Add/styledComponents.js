import styled from 'styled-components';

import { CheckboxWithLabel } from 'components/base_ui';
import {
  defaultFontSize,
  subHeaderColor,
  headerFontSize,
  textColor,
  hyperlinkColor,
  hoverLinkColor,
} from 'defaultStyleHelper';

export const AddWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 15%;
`;

export const AddForm = styled.div`
  background-color: white;
  padding: 1rem 1rem 5rem 1rem;
  border-radius: 0.5rem;
`;

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const StyledCheckboxWithLabel = styled(CheckboxWithLabel)`
  color: ${textColor};
  padding: 0.9rem 0.9rem 0.9rem 0;
`;

export const SelectedOrganization = styled.div`
  margin: 0.5rem 0;
  font-size: ${headerFontSize};
`;

export const StyledH3 = styled.h3`
  color: ${subHeaderColor};
  padding: 1rem 2rem;
  margin-bottom: 0;
`;

export const VerifyWrapper = styled.div`
  padding: 0 3rem;
`;

export const StyledLink = styled.a`
  font-size: ${defaultFontSize};
  color: ${hyperlinkColor};

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;
