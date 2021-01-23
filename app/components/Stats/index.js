import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import StatsPage from './StatsPage';
import StatsTable from './StatsTable';

const Stats = ({ data, deviceView, isOverview }) => (
  <ConditionalRender
    Component={StatsPage}
    FallbackComponent={StatsTable}
    propsToPassDown={{ ...data, deviceView, isOverview }}
    shouldRender={!isOverview}
  />
);

Stats.propTypes = {
  data: T.object.isRequired,
  deviceView: T.string.isRequired,
  isOverview: T.bool.isRequired,
};

export default Stats;
