import styled from 'styled-components';

import { CheckboxWithLabel, FlatIconButton } from 'components/base_ui';
import { subHeaderColor, textColor } from 'defaultStyleHelper';

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const EditWrapper = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  position: relative;
`;

export const StyledCheckboxWithLabel = styled(CheckboxWithLabel)`
  color: ${textColor};
  padding: 0.9rem 0.9rem 0.9rem 0;
`;

export const StyledH3 = styled.h3`
  color: ${subHeaderColor};
  padding: 1rem 2rem;
`;

export const StyledIconButton = styled(FlatIconButton)`
  color: ${textColor};
  padding: 1rem 2rem;
  position: absolute;
  right: 0;
  top: 0;
`;

export const Wrapper = styled.div`
  padding: 0 6.5rem;
`;
