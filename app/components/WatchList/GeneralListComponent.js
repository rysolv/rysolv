import React from 'react';
import T from 'prop-types';

import { ProfileImage } from 'components/base_ui';

import {
  Username,
  WatchList,
  WatchListDetail,
  WatchListItem,
} from './styledComponents';

const GeneralListComponent = ({ handleRedirect, route, tableData }) => (
  <WatchList>
    {tableData.map(({ id, username, profilePic }) => (
      <WatchListItem key={`list-item-${id}`}>
        <WatchListDetail>
          <ProfileImage
            alt={username}
            detailRoute={`${route}/${id}`}
            handleNav={handleRedirect}
            profilePic={profilePic}
            size="3.5rem"
          />
          <Username
            href={`${route}/${id}`}
            onClick={() => handleRedirect(`${route}/${id}`)}
          >
            {username}
          </Username>
        </WatchListDetail>
      </WatchListItem>
    ))}
  </WatchList>
);

GeneralListComponent.propTypes = {
  handleRedirect: T.func.isRequired,
  route: T.string.isRequired,
  tableData: T.array.isRequired,
};

export default GeneralListComponent;
