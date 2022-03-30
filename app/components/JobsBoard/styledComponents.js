import styled, { css } from 'styled-components';

import { LanguageWrapper, PrimaryAsyncButton } from 'components/base_ui';
import {
  blueColor,
  candidateGreyColor,
  darkBlueColor,
  lightBlueColor,
  lightGreyColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

const baseButtonStyle = css`
  align-items: center;
  border-radius: 0.8rem;
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height: 1.936rem;
  margin: 0;
  text-transform: initial;
  width: 10rem;
`;

const baseInputStyle = css`
  background: ${candidateGreyColor};
  border-radius: 0.7rem;
  border: none;
  color: ${textColor};
  font-size: 1.6rem;
  font-weight: 400;
  height: ${({ height, multiple }) => (multiple ? 'auto' : height)};
  line-height: 1.936rem;
  min-height: ${({ height, multiple }) => (multiple ? height : 'auto')};
  outline: none;
  overflow: hidden;
  padding: 1.6rem 2.4rem;
  transform: matrix(1, 0, 0, 1, 0, 0);
  width: 100%;
`;

export const ClearButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  color: ${lightBlueColor};
  display: flex;
  font-size: 1.6rem;
  margin-left: 0.2em;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`;

export const CommonKeywordsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1.6rem 0 3.2rem -0.4rem;
`;

export const Input = styled.input`
  ${baseInputStyle};
`;

export const JobsBoardContainer = styled.div`
  width: 100%;
`;

export const JobsBoardHeader = styled.div`
  color: ${blueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  padding: 2rem 0;
`;

export const JobsBoardSubText = styled.div`
  color: ${lightGreyColor};
  font-size: 2rem;
  font-weight: 500;
  padding-bottom: 3.2rem;
`;

export const KeywordTag = styled(LanguageWrapper)`
  display: inline-block;
  margin: 0.2em;

  &:hover {
    cursor: pointer;
    filter: brightness(0.95);
  }
`;

export const SearchInputContainer = styled.div`
  display: flex;

  @media (max-width: 453px) {
    flex-direction: column;
  }
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  ${baseButtonStyle};
  background-color: ${darkBlueColor};
  color: ${whiteColor};
  margin-left: 3.2rem;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }

  @media (max-width: 453px) {
    margin-left: 0;
    margin-top: 1.6rem;
    width: 100%;
  }
`;
