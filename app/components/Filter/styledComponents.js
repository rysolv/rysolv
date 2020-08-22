import styled from 'styled-components';

import { BaseExpansionPanel } from 'components/base_ui';
import { textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const FilterContainer = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid #cfd8dc;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  ${mobile} {
    padding: 0 1rem;
  }
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const StyledBaseExpansionPanel = styled(BaseExpansionPanel)`
  .MuiExpansionPanelSummary-root {
    padding: 0;
  }

  .MuiExpansionPanelSummary-content {
    margin: 0;
  }

  &.Mui-expanded {
    &:last-child {
      margin-bottom: 1rem;
    }
  }
`;

export const StyledLabel = styled.h4`
  color: #6a737d;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 0 0.5rem 0;
`;

export const StyledTitle = styled.h2`
  color: ${textColor};
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 1.2;
  margin: 1rem 0;
`;
