import React from 'react';
import T from 'prop-types';

import { ConditionalRender, IconButton } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import EmptyList from './EmptyList';
import GeneralListComponent from './GeneralListComponent';
import PullRequestListComponent from './PullRequestListComponent';
import {
  IconWrapper,
  StyledTitle,
  WatchListContainer,
} from './styledComponents';

const closeIcon = iconDictionary('close');

const WatchList = ({
  handleClose,
  handleDeletePullRequest,
  handleRedirect,
  isSignedIn,
  route,
  tableData,
  title,
  type,
}) => {
  const ListComponentToRender =
    type !== 'pullRequestList'
      ? GeneralListComponent
      : PullRequestListComponent;
  const shouldRender =
    type !== 'pullRequestList'
      ? !!tableData.length
      : !!tableData.pullRequests.length;
  return (
    <WatchListContainer>
      <IconWrapper>
        <IconButton icon={closeIcon} label="Close" onClick={handleClose} />
      </IconWrapper>
      <StyledTitle>{title}</StyledTitle>
      <ConditionalRender
        Component={ListComponentToRender}
        FallbackComponent={<EmptyList type={type} />}
        propsToPassDown={{
          handleClose,
          handleDeletePullRequest,
          handleRedirect,
          isSignedIn,
          route,
          tableData,
        }}
        shouldRender={shouldRender}
      />
    </WatchListContainer>
  );
};

WatchList.propTypes = {
  handleClose: T.func,
  handleDeletePullRequest: T.func,
  handleRedirect: T.func,
  isSignedIn: T.bool,
  route: T.string,
  tableData: T.oneOfType([T.array, T.object]),
  title: T.string,
  type: T.string,
};

export default WatchList;
