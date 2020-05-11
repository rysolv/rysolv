import styled from 'styled-components';

import { CheckboxWithLabel } from 'components/base_ui';
import { subHeaderColor, textColor } from 'defaultStyleHelper';

export const AddWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 10%;
`;

export const AddForm = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
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
  padding: 0 6.5rem;
`;
