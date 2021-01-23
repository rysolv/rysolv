/* eslint-disable no-param-reassign */
import isEmpty from 'lodash/isEmpty';

export const getNumOfTablesToRender = data =>
  data.reduce((acc, { tableData }) => {
    if (!isEmpty(tableData)) acc += 1;
    return acc;
  }, 0);
