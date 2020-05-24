import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import Tabs from '@material-ui/core/Tabs';

import UserTimelineView from './Timeline';
import { StyledPaper, StyledTab } from './styledComponents';

const SettingsTabs = ({
  attempting,
  currentTab,
  filterValues,
  handleInputChange,
  handleNav,
  handleRemoveIssue,
  userId,
  watching,
}) => {
  const [value, setValue] = useState(currentTab);
  useEffect(() => setValue(currentTab), [currentTab]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const ComponentToRender = {
    0: (
      <UserTimelineView
        attempting={attempting}
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        handleNav={handleNav}
        handleRemoveIssue={handleRemoveIssue}
        userId={userId}
        watching={watching}
      />
    ),
  };
  return (
    <StyledPaper>
      <Tabs
        indicatorColor="primary"
        onChange={handleChange}
        textColor="primary"
        value={value}
      >
        <StyledTab label="Overview" />
        <StyledTab label="Account" />
        <StyledTab label="Issues" />
        <StyledTab label="Organizations" />
        <StyledTab label="Pull Requests" />
      </Tabs>
      {ComponentToRender[value]}
    </StyledPaper>
  );
};

SettingsTabs.propTypes = {
  attempting: T.array,
  currentTab: T.number,
  filterValues: T.object,
  handleInputChange: T.func,
  handleNav: T.func,
  handleRemoveIssue: T.func,
  userId: T.string,
  watching: T.array,
};

export default SettingsTabs;
