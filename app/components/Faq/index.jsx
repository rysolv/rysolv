import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';

import {
  AnswerWrapper,
  BottomQuestionIntro,
  FaqHeader,
  FaqSubheader,
  QuestionGroup,
  QuestionIntroWrapper,
  QuestionWrapper,
  StyledA,
  StyledBaseExpansionPanel,
  StyledFaqContainer,
  StyledQuestionContainer,
  TopQuestionIntro,
} from './styledComponent';

const ExpansionPanel = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'FAQ';
  }, []);
  return (
    <StyledFaqContainer>
      <FaqHeader>FAQ</FaqHeader>
      <StyledQuestionContainer>
        <QuestionIntroWrapper>
          <TopQuestionIntro>
            Get answers to frequently asked questions about Rysolv
          </TopQuestionIntro>
          <BottomQuestionIntro>
            Any more questions? Just shoot us an email at{' '}
            <StyledA href="mailto:support@rysolv.com">
              support@rysolv.com
            </StyledA>{' '}
            and we&apos;ll reply asap.
          </BottomQuestionIntro>
        </QuestionIntroWrapper>
        <QuestionWrapper>
          <QuestionGroup>
            <FaqSubheader>General</FaqSubheader>
            <ExpansionPanel>
              <StyledBaseExpansionPanel
                Component={() => (
                  <AnswerWrapper>
                    Contra is a new type of professional network for people you
                    actually work with. Contra allows you to find flexible work
                    opportunities from people that you know and love. Think of
                    it as your own exclusive community/referral network.
                  </AnswerWrapper>
                )}
                open
                title="What is Rysolv?"
              />
            </ExpansionPanel>
            <ExpansionPanel>
              <StyledBaseExpansionPanel
                Component={() => (
                  <AnswerWrapper>
                    Contra is a new type of professional network for people you
                    actually work with. Contra allows you to find flexible work
                    opportunities from people that you know and love. Think of
                    it as your own exclusive community/referral network.
                  </AnswerWrapper>
                )}
                title="How to add organizations to ?"
              />
            </ExpansionPanel>
            <ExpansionPanel>
              <StyledBaseExpansionPanel
                Component={() => (
                  <AnswerWrapper>
                    Contra is a new type of professional network for people you
                    actually work with. Contra allows you to find flexible work
                    opportunities from people that you know and love. Think of
                    it as your own exclusive community/referral network.
                  </AnswerWrapper>
                )}
                title="What is Rysolv?"
              />
            </ExpansionPanel>
            <ExpansionPanel>
              <StyledBaseExpansionPanel
                Component={() => (
                  <AnswerWrapper>
                    Contra is a new type of professional network for people you
                    actually work with. Contra allows you to find flexible work
                    opportunities from people that you know and love. Think of
                    it as your own exclusive community/referral network.
                  </AnswerWrapper>
                )}
                title="What is Rysolv?"
              />
            </ExpansionPanel>
            <ExpansionPanel>
              <StyledBaseExpansionPanel
                Component={() => (
                  <AnswerWrapper>
                    Contra is a new type of professional network for people you
                    actually work with. Contra allows you to find flexible work
                    opportunities from people that you know and love. Think of
                    it as your own exclusive community/referral network.
                  </AnswerWrapper>
                )}
                title="What is Rysolv?"
              />
            </ExpansionPanel>
          </QuestionGroup>

          <QuestionGroup hasPadding>
            <FaqSubheader>Payments</FaqSubheader>
          </QuestionGroup>
        </QuestionWrapper>
      </StyledQuestionContainer>
    </StyledFaqContainer>
  );
};

export default Faq;
