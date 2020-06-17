import styled from 'styled-components';

import { BaseDropDownMenu } from 'components/base_ui';
import { defaultFontSize, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

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

  ${mobile} {
    padding-left: 0;
  }
`;

export const StyledBaseDropDownMenu = styled(BaseDropDownMenu)`
  margin: 0 1rem;

  ${mobile} {
    margin-right: 0;
  }
`;

export const StyledLabel = styled.div`
  align-self: center;
  font-size: ${defaultFontSize};
`;
