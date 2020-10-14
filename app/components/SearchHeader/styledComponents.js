import styled from 'styled-components';

import { BaseDropDownMenu, BaseInputWithAdornment } from 'components/base_ui';
import { defaultFontSize, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobileXS, mobile } = mediaQueriesByDevice;

export const StyledBaseInputWithAdornment = styled(BaseInputWithAdornment)`
  ${mobileXS} {
    width: 100%;
  }
`;

export const BaseInputWrapper = styled.div`
  margin-left: ${({ hasMargin }) => (hasMargin ? '4rem' : '0')};
  width: 45%;

  ${mobileXS} {
    width: 22.5rem;
  }
`;

export const DropDownMenuWrapper = styled.div`
  color: ${textColor};
  display: flex;

  ${mobileXS} {
    margin-top: 1rem;
  }
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

  ${mobileXS} {
    flex-direction: column;
  }
`;

export const StyledBaseDropDownMenu = styled(BaseDropDownMenu)`
  margin: 0 1rem;

  ${mobile} {
    margin-right: 0;
  }

  ${mobileXS} {
    width: 16.6rem;
  }
`;

export const StyledLabel = styled.div`
  align-self: center;
  font-size: ${defaultFontSize};
  white-space: nowrap;
`;
