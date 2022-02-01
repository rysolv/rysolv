import React from 'react';
import T from 'prop-types';

import { generateColor } from 'utils/globalHelpers';

import {
  CircularChart,
  InnerCircle,
  OuterCircle,
  Percentage,
  SingleChart,
} from './styledComponents';

const Circle = ({ percentage, ...restProps }) => (
  <SingleChart {...restProps}>
    <CircularChart viewBox="0 0 36 36">
      <OuterCircle
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <InnerCircle
        circleColor={generateColor(percentage)}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        strokeDasharray={`${percentage}, 100`}
      />
      <Percentage x="18" y="20.35">
        {percentage}%
      </Percentage>
    </CircularChart>
  </SingleChart>
);

Circle.propTypes = { percentage: T.number.isRequired };

export default Circle;
