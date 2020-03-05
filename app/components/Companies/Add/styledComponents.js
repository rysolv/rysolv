import styled from 'styled-components';
import { hyperlinkColor, subHeaderColor, textColor } from 'defaultStyleHelper';

export const AddCompanyContainer = styled.section`
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: 2.4rem;
  font-weight: 300;
  height: 50%;
  line-height: 4rem;
  margin: auto;
  padding: 5rem 0;
  text-align: center;
  width: 50%;
`;

export const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InputFormWrapper = styled.div`
  padding: 0 2.5rem;
`;

export const StyledH3 = styled.h3`
  color: ${subHeaderColor};
  padding: 1rem 2rem;
`;

export const StyledLabel = styled.div`
  color: ${hyperlinkColor};

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
