import styled, { css } from 'styled-components';

import { PrimaryButton } from 'components/base_ui';
import {
  blueColor,
  blueGrayColor,
  candidateGreyColor,
  darkBlueColor,
  grayColor,
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
  margin: auto;
  text-transform: initial;
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

export const BottomContentWrapper = styled.div`
  display: flex;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const IconWrapper = styled.img`
  align-self: center;
  height: 9.219rem;
  width: 9.189rem;
`;

export const JobCardContainer = styled.div`
  ${baseInputStyle}
  background: ${whiteColor};
  border-radius: 0.7rem;
  box-shadow: 0 0.1rem 0.4rem ${grayColor};
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  padding: 1.6rem 2.4rem;
  position: relative;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

export const JobCompany = styled.div`
  color: ${blueColor};
  font-size: 2rem;
  font-weight: 700;
`;

export const JobCompanyWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const JobContent = styled.div`
  display: flex;
  width: 100%;
`;

export const JobLocation = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  span {
    margin-right: 0.3rem;
  }
`;

export const JobSalary = styled.div`
  margin-right: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  span {
    margin-right: 0.3rem;
  }
`;

export const JobsWrapper = styled.div`
  flex: 1;
`;

export const JobTitle = styled.div`
  color: ${blueColor};
  font-size: 2rem;
  font-weight: 700;
`;

export const KeywordTag = styled.div`
  background: ${blueGrayColor};
  border-radius: 1.2rem;
  border: 0.2rem solid ${whiteColor};
  color: ${whiteColor};
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 800;
  height: fit-content;
  justify-content: center;
  line-height: 1;
  margin: 0.2em;
  padding: 0.7rem;
  text-transform: uppercase;
  width: auto;

  &:hover {
    cursor: pointer;
  }
`;

export const KeywordWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const MiddleContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 0.2rem;
  margin: 0.6rem 0;
`;

export const NoRecommendedJobsContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

export const PostedDate = styled.div`
  padding: 1.6rem 2.4rem;
  position: absolute;
  right: 0;
  top: 0;
`;

export const RecommendedJobsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  min-height: ${({ hasMinHeight }) => (hasMinHeight ? '50rem' : 'auto')};
`;

export const RecommendedJobsHeader = styled.div`
  color: ${blueColor};
  font-size: 2.4rem;
  font-weight: 400;
  line-height: 2.905rem;
`;

export const StyledParagraph = styled.p`
  color: ${darkBlueColor};
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  ${baseButtonStyle};
  background-color: ${darkBlueColor};
  color: ${whiteColor};
  margin-top: 3rem;
  min-width: 10rem;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;

export const TextWrapper = styled.div`
  padding: 0.4rem 0.2rem 0;
`;

export const TopContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-flow: wrap;
  margin-left: 0.4rem;
`;
