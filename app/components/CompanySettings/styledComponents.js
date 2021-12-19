import styled from 'styled-components';

import { blueColor, lightGreyColor } from 'defaultStyleHelper';

export const CompanySettingsContainer = styled.div`
  width: 100%;
`;

export const CompanySettingsHeader = styled.div`
  color: ${blueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  padding: 2rem 0 1rem;
`;

export const CompanySettingsSubText = styled.div`
  color: ${lightGreyColor};
  flex: 0;
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem 0;
`;
