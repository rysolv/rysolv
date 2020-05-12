import styled from 'styled-components';

import { BaseDropDownMenu } from 'components/base_ui';
import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const BaseInputWrapper = styled.div`
  margin-left: ${({ hasMargin }) => (hasMargin ? '4rem' : '0')};
  width: 45%;
`;

export const DropDownMenuWrapper = styled.div`
  color: ${textColor};
  display: flex;
`;

export const SearchHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-left: 1rem;
  width: 100%;
`;

export const StyledBaseDropDownMenu = styled(BaseDropDownMenu)`
  margin: 0 1rem;
`;

export const StyledLabel = styled.div`
  align-self: center;
  font-size: ${defaultFontSize};
`;
