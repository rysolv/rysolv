import styled, { css } from 'styled-components';

import { PrimaryAsyncButton } from 'components/base_ui';
import {
  blueColor,
  blueGrayColor,
  darkBlueColor,
  candidateGreyColor,
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

export const JobsBoardContainer = styled.div`
  width: 100%;
`;

export const JobCard = styled.div`
  ${baseInputStyle}
  background: ${whiteColor};
  display: flex;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

export const JobCompany = styled.div`
  color: ${blueColor};
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 3.45rem;
`;

export const JobContent = styled.div`
  display: flex;
`;

export const JobLocation = styled.div`
  white-space: nowrap;
`;

export const JobLogo = styled.img`
  background: ${candidateGreyColor};
  border-radius: 0.7rem;
  border: 0.2rem solid ${candidateGreyColor};
  height: 7.5rem;
  margin-right: 1.6rem;
  object-fit: cover;
  width: 7.5rem;
`;

export const JobLogoWrapper = styled.div`
  align-items: center;
  background: ${candidateGreyColor};
  border-radius: 0.7rem;
  border: 0.2rem solid ${candidateGreyColor};
  display: flex;
  font-size: 4.6rem;
  height: 7.5rem;
  justify-content: center;
  margin-right: 1.6rem;
  object-fit: cover;
  width: 7.5rem;
`;

export const JobSalary = styled.div`
  margin-right: 1.4rem;
  white-space: nowrap;
`;

export const JobTitle = styled.div`
  color: ${blueColor};
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 3.45rem;
`;

export const PostedDate = styled.div`
  padding: 1.6rem 2.4rem;
  position: absolute;
  right: 0;
  top: 0;
}
`;
export const TopContentWrapper = styled.div`
  align-items: center;
  display: flex;
  white-space: nowrap;
`;

export const BottomContentWrapper = styled.div`
  display: flex;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TextWrapper = styled.div`
  padding: 0.6rem 0.4rem 0;
`;

export const KeywordWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const KeywordTag = styled.div`
  background: ${blueGrayColor};
  color: white;
  justify-content: center;
  line-height: 1;
  font-weight: 800;
  font-size: 1.2rem;
  color: ${whiteColor};
  width: auto;
  border: 0.2rem solid ${whiteColor};
  border-radius: 1.2rem;
  padding: 0.7rem;
  margin: 0.2em;
  display: inline-block;
  text-transform: uppercase;
  height: fit-content;
`;

export const Input = styled.input`
  ${baseInputStyle};
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
`;

export const SearchInputContainer = styled.div`
  display: flex;
  margin-bottom: 5rem;
`;

export const JobsBoardHeader = styled.div`
  color: ${blueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  padding: 2rem 0;
`;
