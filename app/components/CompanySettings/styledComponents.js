import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import {
  blueColor,
  darkBlueColor,
  defaultFontFamily,
  lightGreyColor,
} from 'defaultStyleHelper';

export const CompanySettingsContainer = styled.div`
  width: 100%;
`;

export const CompanySettingsHeader = styled.div`
  color: ${blueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  padding: 2rem 0;
`;

export const CompanySettingsSubText = styled.div`
  color: ${lightGreyColor};
  flex: 0;
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem 0;
`;

export const HorizontalDivider = styled.div`
  border-bottom: 0.1rem solid rgb(211 211 211 / 70%);
  height: 0.1rem;
  margin-bottom: 1rem;
`;
export const SettingsLabel = styled.div`
  color: ${darkBlueColor};
  font-size: 2rem;
  font-weight: 500;
`;

export const SettingsLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const StyledButton = styled(Button)`
  color: ${darkBlueColor};
  font-family: ${defaultFontFamily};
  font-size: 1.4rem;
  margin: 0;
  padding: 0rem;
  text-transform: none;

  &:hover {
    background-color: transparent;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;
