import styled from 'styled-components';

import { BaseExpansionPanel } from 'components/base_ui';
import {
  commentHeaderColor,
  defaultFontSize,
  headerFontSize,
  hoverLinkColor,
  landingButtonGreen,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, laptop } = mediaQueriesByDevice;

export const AnswerWrapper = styled.div`
  display: flex;
  font-size: ${defaultFontSize};
  line-height: 1.5;
  padding-bottom: 2.5rem;
  text-align: start;
`;

export const BottomQuestionIntro = styled.div`
  margin: 1.5rem;
`;

export const FaqHeader = styled.div`
  color: ${textColor};
  display: flex;
  font-size: ${headerFontSize};
  margin: 2rem 0;
  width: 100%;

  ${mobile} {
    margin: 2rem 0;
  }
`;

export const FaqSubheader = styled.div`
  display: flex;
  font-size: ${headerFontSize};
  margin-bottom: 2rem;
`;

export const QuestionGroup = styled.div`
  padding: ${({ hasPadding }) => (hasPadding ? '7.5rem 0' : '0')};
`;

export const QuestionIntroWrapper = styled.div`
  background: ${commentHeaderColor};
  height: auto;
  min-height: 10rem;
`;

export const QuestionWrapper = styled.div`
  padding: 3.8rem 2.6rem;
`;

export const StyledA = styled.a`
  color: ${hoverLinkColor};

  &:hover {
    color: ${hoverLinkColor};
    text-decoration: underline;
  }
`;

export const StyledBaseExpansionPanel = styled(BaseExpansionPanel)`
  &.expanded {
    margin: 0rem;
  }

  .MuiExpansionPanelSummary-root {
    margin: 0;
    padding: 0;
  }

  .MuiExpansionPanelSummary-content {
    margin: 0;
  }

  .MuiTypography-body1 {
    font-size: 1.8rem;
    padding: 2.2rem 0;
    text-align: left;
  }

  svg {
    color: ${landingButtonGreen};
    font-size: 2.5rem;
  }
`;

export const StyledQuestionContainer = styled.div`
  background: white;
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  text-align: center;
  width: 100%;
`;

export const TopQuestionIntro = styled.div`
  font-size: 2.2rem;
  font-weight: 300;
  letter-spacing: 0.05rem;
  line-height: 1.5;
  margin: 1.5rem;
`;

export const ViewContainer = styled.div`
  background: ${whiteColor};
  display: flex;
  flex-direction: column;
  padding: 5rem 12rem 5.6rem;
  width: 100%;

  ${laptop} {
    padding: 5rem 3rem 5.6rem;
  }
`;
