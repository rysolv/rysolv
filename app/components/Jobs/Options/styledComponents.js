import React from 'react';
import styled from 'styled-components';

import { PrimaryButton } from 'components/base_ui';

export const StyledPrimaryButton = styled(({ isSelected, ...restProps }) => (
  <PrimaryButton {...restProps} />
))`
  background-color: ${({ isSelected }) => (isSelected ? 'purple' : 'grey')};
`;
