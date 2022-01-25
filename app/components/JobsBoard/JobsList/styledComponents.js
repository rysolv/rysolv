import styled, { css } from 'styled-components';

import {
  blueColor,
  candidateGreyColor,
  darkBlueColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

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

const baseLogoStyle = css`
  align-self: center;
  background: ${candidateGreyColor};
  border-radius: 0.7rem;
  border: 0.2rem solid ${candidateGreyColor};
  height: 7.5rem;
  margin-right: 1.6rem;
  object-fit: cover;
  width: 7.5rem;
`;

export const BottomContentWrapper = styled.div`
  display: flex;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const HorizontalDivider = styled.div`
  border-bottom-width: 0;
  border-color: #e1e2e3;
  border-style: dashed;
  border-top-width: 0.2rem;
  flex-grow: 1;
  margin: 0.4rem 0 1.6rem;
`;

export const IconWrapper = styled.img`
  align-self: center;
  height: 9.219rem;
  width: 9.189rem;
`;

export const JobsBoardContainer = styled.div`
  width: 100%;
`;

export const JobCard = styled.div`
  ${baseInputStyle}
  background: ${whiteColor};
  display: flex;
  position: relative;
`;

export const JobCompany = styled.div`
  color: ${blueColor};
  font-size: 2rem;
  font-weight: 700;
  line-height: 3.45rem;
`;

export const JobContent = styled.div`
  display: flex;
`;

export const JobsListContainer = styled.div``;

export const JobLocation = styled.div`
  white-space: nowrap;
`;

export const JobLogo = styled.img`
  ${baseLogoStyle}
`;

export const JobLogoWrapper = styled.div`
  ${baseLogoStyle}
  align-items: center;
  display: flex;
  font-size: 4.6rem;
  justify-content: center;
`;

export const JobSalary = styled.div`
  margin-right: 1.4rem;
  white-space: nowrap;
`;

export const JobTitle = styled.div`
  color: ${blueColor};
  font-size: 2rem;
  font-weight: 700;
  line-height: 3.45rem;
  margin-left: 0.3rem;
`;

export const KeywordWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const MiddleContentWrapper = styled.div`
  display: flex;
  margin: 0.6rem 0;
`;

export const NoJobsListContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 50rem;
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

export const StyledParagraph = styled.p`
  color: ${darkBlueColor};
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
`;

export const TextWrapper = styled.div`
  padding: 0.6rem 0.2rem 0;
`;

export const TopContentWrapper = styled.div`
  align-items: center;
  display: flex;
  white-space: nowrap;
`;
