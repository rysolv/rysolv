import React from 'react';
import T from 'prop-types';

import { BaseTable, IconButton } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import { IconWrapper, StyledTitle } from './styledComponents';

const closeIcon = iconDictionary('close');

const WatchList = ({
  handleClose,
  handleRedirect,
  route,
  tableData,
  title,
  type,
}) => (
  <div>
    <IconWrapper>
      <IconButton
        icon={closeIcon}
        label="Close"
        onClick={() => handleClose()}
      />
    </IconWrapper>
    <StyledTitle>{title}</StyledTitle>
    <BaseTable
      handleRedirect={handleRedirect}
      route={route}
      tableData={tableData}
      type={type}
    />
  </div>
);

WatchList.propTypes = {
  handleClose: T.func,
  handleRedirect: T.func,
  route: T.string,
  tableData: T.arrayOf(T.object),
  title: T.string,
  type: T.string,
};

export default WatchList;
