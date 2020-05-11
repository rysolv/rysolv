import React from 'react';
import T from 'prop-types';

import {
  FundingWrapper,
  LanguageWrapper,
  WatchButton,
} from 'components/base_ui';

import { Divider, StyledIssueSidebar, SidebarItem } from './styledComponents';

const IssueSidebar = ({ data, activeUser, handleIncrement }) => {
  const { id, language, open, watching } = data;
  const userWatching = activeUser.watching && activeUser.watching.includes(id);

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
          label={userWatching ? 'Watching' : 'Watch'}
          value={watching.length}
          handleWatch={() =>
            handleIncrement({
              userId: activeUser.id,
              id,
              column: 'watching',
              remove: userWatching,
            })
          }
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
  handleIncrement: T.func,
};

export default IssueSidebar;
