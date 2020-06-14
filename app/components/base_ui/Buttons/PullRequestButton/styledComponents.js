import styled from 'styled-components';

import { borderColor, textColor } from 'defaultStyleHelper';

export const PullRequestButtonContainer = styled.div`
  border-radius: 0.3rem;
  border: 0.1rem solid ${borderColor};
  display: flex;
`;

export const LabelWrapper = styled.div`
  display: inline-flex;
  margin-left: 0.5rem;
`;

export const StyledPullRequestButton = styled.button`
  align-items: center;
  background-color: #eff3f6;
  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);
  border-bottom-left-radius: 0.3rem;
  border-top-left-radius: 0.3rem;
  border: 0;
  color: ${textColor};
  cursor: pointer;
  display: flex;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 2rem;
  padding: 0.3rem 1rem;
  position: relative;
  white-space: nowrap;

  &:hover {
    background-color: #f5f5f5;
    box-shadow: 0px 2px 5px 0.5px rgba(0, 0, 0, 0.1);
    cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  }

  &:active {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  }

  &:focus {
    outline: 0;
  }

  svg {
    font-size: 1.4rem;
  }
`;

export const ValueWrapper = styled.div`
  align-items: center;
  background-color: #fff;
  border-bottom-right-radius: 0.3rem;
  border-left: 0.1rem solid ${borderColor};
  border-top-right-radius: 0.3rem;
  color: ${textColor};
  font-size: 1.2rem;
  font-weight: 600;
  height: 100%;
  line-height: 2rem;
  padding: 0.3rem 1rem;

  &:hover {
    color: #007bff;
    cursor: pointer;
  }
`;
