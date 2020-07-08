/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  ContentWrapper,
  Icon,
  IssueFundedAmount,
  IssueMerged,
  PullRequestCardContainer,
  PullRequestContent,
  PullRequestDateWrapper,
  PullRequestListItem,
  StatusWrapper,
  TestIconContainer,
  TestIconWrapper,
  TitleWrapper,
  TopContainer,
  UrlWrapper,
} from './styledComponents';

const CheckIcon = iconDictionary('check');
const CloseIcon = iconDictionary('close');
const GithubIcon = iconDictionary('github');

const PullRequestCard = ({ data }) => (
  <PullRequestCardContainer>
    {data.map(
      (
        { createdDate, fundedAmount, htmlUrl, mergeableState, merged, title },
        index,
      ) => {
        const isMergeable = mergeableState === 'clean';
        return (
          <PullRequestListItem key={`list-item-${index}`}>
            <TopContainer>
              <UrlWrapper href={htmlUrl} target="_blank">
                <Icon>{GithubIcon}</Icon> View on Github
              </UrlWrapper>
              <PullRequestDateWrapper>
                Created {moment(createdDate).format('M/D/YYYY')}
              </PullRequestDateWrapper>
            </TopContainer>
            <PullRequestContent>
              <ContentWrapper>
                <TitleWrapper>{title}</TitleWrapper>
                <StatusWrapper>
                  <div>
                    <IssueMerged merged={merged}>
                      {merged ? 'Merged' : 'Open'}
                    </IssueMerged>
                  </div>
                  <TestIconContainer>
                    <TestIconWrapper isMergeable={isMergeable}>
                      {isMergeable ? CheckIcon : CloseIcon}
                    </TestIconWrapper>
                    <div>Tests Passed</div>
                  </TestIconContainer>
                </StatusWrapper>
              </ContentWrapper>
              <IssueFundedAmount>
                {formatDollarAmount(fundedAmount)}
              </IssueFundedAmount>
            </PullRequestContent>
          </PullRequestListItem>
        );
      },
    )}
  </PullRequestCardContainer>
);

PullRequestCard.propTypes = {
  data: T.array.isRequired,
};

export default PullRequestCard;
