import React from 'react';

import RecentlyFundedModal from 'components/RecentlyFundedModal';
import TopContributorsModal from 'components/TopContributorsModal';

import { SidebarContainer } from './styledComponents';

const Sidebar = () => (
  <SidebarContainer>
    <RecentlyFundedModal />
    <TopContributorsModal />
  </SidebarContainer>
);

export default Sidebar;
