import styled from 'styled-components';

import { CheckboxWithLabel } from 'components/base_ui';
import { borderColor, subHeaderColor, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';
const { desktop, laptop, tablet, mobile } = mediaQueriesByDevice;

export const AddWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  width: 100%;
`;

export const AddForm = styled.div`
  background-color: white;
  border: 0.1rem solid ${borderColor};
  width: 60%;
  padding: 1rem;
  border-radius: 0.5rem;

  ${desktop} {
    width: 60%;
  }
  ${laptop} {
    width: 80%;
  }
  ${tablet} {
    width: 90%;
  }
  ${mobile} {
    width: 100%;
  }
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
