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
                    Rysolv is a crowdfunding platform designed to accelerate
                    work on open source projects. Users sponsor outstanding
                    issues or feature requests in open source projects.
                    Developers earn bounties by resolving them.
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
                    Rysolv connects users with developers allowing them to
                    support software they care about. Users can fund open source
                    projects issue by issue, and developers get paid for working
                    on their passions
                  </AnswerWrapper>
                )}
                title="How does Rysolv work?"
              />
            </ExpansionPanel>
            <ExpansionPanel>
              <StyledBaseExpansionPanel
                Component={() => (
                  <AnswerWrapper>
                    Anyone can create an issue for any repository. For issues
                    imported from Github, Rysolv monitors the issue on Github to
                    determine when it is closed.
                  </AnswerWrapper>
                )}
                title="Who can create an issue?"
              />
            </ExpansionPanel>
            <ExpansionPanel>
              <StyledBaseExpansionPanel
                Component={() => (
                  <AnswerWrapper>
                    Any user can contribute to an issue. Any contribution adds
                    to the bounty on that issue, and will be earned by whoever
                    submits a successful solution.
                    <br />
                    <br />
                    You can fund an issue with a credit/debit card, or through
                    PayPal.
                  </AnswerWrapper>
                )}
                title="How do issues get funded?"
              />
            </ExpansionPanel>
            <ExpansionPanel>
              <StyledBaseExpansionPanel
                Component={() => (
                  <AnswerWrapper>
                    At the top of each issue page, you will see a &apos;Submit
                    Pull Request&apos; button. From there you can import a pull
                    request from Github.
                    <br />
                    <br />
                    Keep in mind you must create the pull request in Github
                    first. And you can only import a Pull Request that matches
                    the issue repo;
                  </AnswerWrapper>
                )}
                title="How do I submit a solution to an issue?"
              />
            </ExpansionPanel>
          </QuestionGroup>

          <QuestionGroup hasPadding>
            <FaqSubheader>Payments</FaqSubheader>
            <ExpansionPanel>
              <StyledBaseExpansionPanel
                Component={() => (
                  <AnswerWrapper>
                    When a solution is accepted, your account will be credited
                    for the bounty on that issue. You can withdraw your balance
                    under your accounts Settings page.
                  </AnswerWrapper>
                )}
                title="How do I receive payment?"
              />
            </ExpansionPanel>
          </QuestionGroup>
        </QuestionWrapper>
      </StyledQuestionContainer>
    </StyledFaqContainer>
  );
};

export default Faq;
