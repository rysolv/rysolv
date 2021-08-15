import React from 'react';

import {
  CardContainer,
  CodeRankingContainer,
  CodeRankingHeader,
  CodeRankingText,
  ContentGroup,
  CodeRankingSubheader,
} from './styledComponents';

const CodeRanking = () => (
  <CodeRankingContainer>
    <CardContainer>
      <ContentGroup>
        <CodeRankingHeader>Ranking code</CodeRankingHeader>
        <CodeRankingText>
          No one writes sorting algorithms for work. So why does everyone use
          this to judge new applicants? And why do people waste so much
          cumulative time craming for algorithm interviews? Couldn&apos;t those
          hours be better used?
        </CodeRankingText>
        <CodeRankingText>
          What do engineers actually do at work?
          <ul>
            <li>Break assignments into deliverable tasks</li>
            <li>Communicate expectations</li>
            <li>Review code</li>
          </ul>
        </CodeRankingText>
      </ContentGroup>
      <ContentGroup>
        <CodeRankingSubheader>
          Good coders code with other good coders
        </CodeRankingSubheader>
        <CodeRankingText>
          We&apos;re working on the basic assumption that good developers like
          to work with other good developers.
        </CodeRankingText>
        <CodeRankingText>
          Asides from code, we score:
          <ul>
            <li>Commenting on issues</li>
            <li>Having reviews on your code</li>
            <li>Providing code reviews</li>
            <li>Raising issues</li>
            <li>Submitting pull requests</li>
          </ul>
        </CodeRankingText>
      </ContentGroup>
      <ContentGroup>
        <CodeRankingSubheader>It&apos;s cumulative</CodeRankingSubheader>
        <CodeRankingText>
          Any experience is good experience. We don&apos;t penalize your old
          code.
        </CodeRankingText>
      </ContentGroup>
      <ContentGroup isLastGroup>
        <CodeRankingSubheader>Comparing languages</CodeRankingSubheader>
        <CodeRankingText>
          While our analysis is Lines Of Code (LOC) based, we know that each
          language will vastly differ.
        </CodeRankingText>
        <CodeRankingText isIndented>
          Ex: 5,000 lines of Javascript is probably a handful of React
          components vs. 5,000 lines of SQL is a serious amount of code.
        </CodeRankingText>
        <CodeRankingText>
          Instead of a direct comparison, we weigh each language based on the
          average number of lines per language per user in the Rysolv network.
        </CodeRankingText>
        <CodeRankingText>
          Using the JavaScript vs. SQL example above, if the average Rysolv
          JavaScript user has witten 20,000 lines of JavaScript and the average
          SQL user has written 800 lines of SQL, a user with 10,000 lines of
          JavaScript and 2,000 lines of SQL will score below average on
          JavaScript and above average on SQL.
        </CodeRankingText>
      </ContentGroup>
    </CardContainer>
  </CodeRankingContainer>
);

export default CodeRanking;
