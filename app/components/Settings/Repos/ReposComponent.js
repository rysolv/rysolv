import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { IconButton } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  IconButtonWrapper,
  ImageWrapper,
  RepoContent,
  RepoContentInfo,
  RepoDetail,
  RepoFundedAmount,
  RepoFundedWrapper,
  RepoIssues,
  RepoListItem,
  RepoModifiedDate,
  RepoName,
  ReposList,
  StyledImage,
} from './styledComponents';

const EditIcon = iconDictionary('edit');

const ReposComponent = ({ handleNav, repos }) => (
  <ReposList>
    {repos.map(({ id, issues, logo, modifiedDate, name, totalFunded }) => (
      <RepoListItem key={`list-item-${id}`}>
        <IconButtonWrapper>
          <IconButton
            icon={EditIcon}
            label="Edit"
            onClick={() => handleNav(`/repos/detail/${id}`)}
          />
        </IconButtonWrapper>
        <RepoContent>
          <ImageWrapper>
            <StyledImage alt="Repo Image" src={logo} />
          </ImageWrapper>
          <RepoContentInfo>
            <RepoModifiedDate>
              {moment.utc(modifiedDate).fromNow()}
            </RepoModifiedDate>
            <RepoDetail>
              <RepoName onClick={() => handleNav(`/repos/detail/${id}`)}>
                {name}
              </RepoName>
              <RepoFundedWrapper>
                <RepoIssues>{issues.length} Issues</RepoIssues>
                <RepoFundedAmount open>
                  {formatDollarAmount(totalFunded)}
                </RepoFundedAmount>
              </RepoFundedWrapper>
            </RepoDetail>
          </RepoContentInfo>
        </RepoContent>
      </RepoListItem>
    ))}
  </ReposList>
);

ReposComponent.propTypes = {
  handleNav: T.func,
  repos: T.array,
};

export default ReposComponent;
