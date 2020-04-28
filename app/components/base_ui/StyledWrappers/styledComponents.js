import styled from 'styled-components';
import { defaultFontSize } from 'defaultStyleHelper';

export const StyledFundingWrapper = styled.div`
  background-color: ${({ open }) =>
    open ? 'rgb(229, 251, 242)' : 'rgb(237, 238, 240)'};
  border-radius: 0.25rem;
  color: ${({ open }) => (open ? 'rgb(8, 178, 110)' : '0')};
  display: inline-block;
  font-weight: 700;
  padding: 0.4rem 0.4rem;
  white-space: nowrap;
  font-size: ${defaultFontSize};
`;
