/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  ButtomBarContainer,
  ContentWrapper,
  DeleteButton,
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
  UrlContainer,
  UrlWrapper,
} from './styledComponents';

const CheckIcon = iconDictionary('check');
const CloseCircleIcon = iconDictionary('closeCircle');
const CloseIcon = iconDictionary('close');
const GithubIcon = iconDictionary('github');
const IssueIcon = iconDictionary('issue');

const PullRequestCard = ({ data, handleDelete }) => (
  <PullRequestCardContainer>
    {data.map(
      (
        {
          createdDate,
          fundedAmount,
          htmlUrl,
          issueId,
          mergeableState,
          merged,
          pullRequestId,
          title,
          userId,
        },
        index,
      ) => {
        const isMergeable = mergeableState === 'clean';
        return (
          <PullRequestListItem key={`list-item-${index}`}>
            <PullRequestDateWrapper>
              Created {moment(createdDate).format('M/D/YYYY')}
            </PullRequestDateWrapper>
            <PullRequestContent>
              <ContentWrapper>
                <TitleWrapper>{title}</TitleWrapper>
                <UrlContainer>
                  <StatusWrapper>
                    <IssueMerged merged={merged}>
                      {merged ? 'Merged' : 'Open'}
                    </IssueMerged>
                    <TestIconContainer>
                      <TestIconWrapper isMergeable={isMergeable}>
                        {isMergeable ? CheckIcon : CloseIcon}
                      </TestIconWrapper>
                      <div>Tests Passed</div>
                    </TestIconContainer>
                  </StatusWrapper>
                </UrlContainer>
                <ButtomBarContainer>
                  <UrlWrapper
                    addPadding
                    href={`/issues/detail/${issueId}`}
                    target="_blank"
                  >
                    <Icon>{IssueIcon}</Icon> View Issue
                  </UrlWrapper>
                  <UrlWrapper href={htmlUrl} target="_blank">
                    <Icon>{GithubIcon}</Icon> View on Github
                  </UrlWrapper>
                  <DeleteButton
                    onClick={() => handleDelete({ pullRequestId, userId })}
                  >
                    <Icon>{CloseCircleIcon}</Icon>Cancel
                  </DeleteButton>
                </ButtomBarContainer>
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
  handleDelete: T.func.isRequired,
};

export default PullRequestCard;
