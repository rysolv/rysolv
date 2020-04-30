import styled from 'styled-components';
import { borderColor, textColor } from 'defaultStyleHelper';

export const StyledWatchButton = styled.button`
  align-items: center;
  background-color: white;
  border-bottom-left-radius: 0.3rem;
  border-top-left-radius: 0.3rem;
  border: 0;
  color: ${textColor};
  display: inline-flex;
  outline: 0;
  overflow: hidden;
  transition: box-shadow 0.2s;
  padding: 0.1rem 0.3rem;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
    -webkit-box-shadow: 0px 2px 5px 0.5px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 2px 5px 0.5px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 5px 0.5px rgba(0, 0, 0, 0.1);
  }

  &:active {
    -webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    -moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  }

  &:focus {
    outline: 0;
  }
`;

export const LabelWrapper = styled.div`
  display: inline-flex;
  margin-left: 0.5rem;
`;

export const WatchButtonContainer = styled.div`
  border-radius: 0.3rem;
  border: 0.1rem solid ${borderColor};
  display: flex;
  height: 2.2rem;
`;

export const ValueWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border-bottom-right-radius: 0.3rem;
  border-left: 0.1rem solid ${borderColor};
  border-top-right-radius: 0.3rem;
  padding: 0 0.5rem;
  height: 100%;
`;
