import React from 'react';
import T from 'prop-types';

import {
  FundingWrapper,
  LanguageWrapper,
  WatchButton,
} from 'components/base_ui';

import { Divider, StyledIssueSidebar, SidebarItem } from './styledComponents';

const IssueSidebar = ({
  activeUser,
  data,
  dispatchFetchWatchList,
  dispatchOpenModal,
  handleIncrement,
  isSignedIn,
}) => {
  const { id, language, open, watching } = data;
  const userWatching =
    activeUser.watching && !!activeUser.watching.find(el => el.id === id);

  return (
    <StyledIssueSidebar>
      Status:
      <SidebarItem>
        <FundingWrapper
          medium
          open={open}
          value={open ? 'Open Issue' : 'Issue Closed'}
        />
      </SidebarItem>
      <Divider />
      Languages
      <SidebarItem>
        {language.map(el => (
          <LanguageWrapper key={`${id}-${el}`} language={el} />
        ))}
      </SidebarItem>
      <Divider />
      Watch
      <SidebarItem>
        <WatchButton
          disabled={!open}
          dispatchFetchWatchList={dispatchFetchWatchList}
          dispatchOpenModal={dispatchOpenModal}
          handleWatch={() =>
            handleIncrement({
              userId: activeUser.id,
              id,
              column: 'watching',
              remove: userWatching,
            })
          }
          isSignedIn={isSignedIn}
          label={userWatching ? 'Watching' : 'Watch'}
          value={watching.length}
          watching={watching}
        />
      </SidebarItem>
      <Divider />
      Pull Requests
      <SidebarItem>0 Pull Requests</SidebarItem>
    </StyledIssueSidebar>
  );
};

IssueSidebar.propTypes = {
  activeUser: T.object,
  data: T.object,
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleIncrement: T.func,
  isSignedIn: T.bool,
};

export default IssueSidebar;
