import React from 'react';
import T from 'prop-types';

import { ConditionalRender, IconButton } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import EmptyList from './EmptyList';
import ListComponent from './ListComponent';
import {
  IconWrapper,
  StyledTitle,
  WatchListContainer,
} from './styledComponents';

const closeIcon = iconDictionary('close');

const WatchList = ({
  handleClose,
  handleRedirect,
  route,
  tableData,
  title,
  type,
}) => (
  <WatchListContainer>
    <IconWrapper>
      <IconButton
        icon={closeIcon}
        label="Close"
        onClick={() => handleClose()}
      />
    </IconWrapper>
    <StyledTitle>{title}</StyledTitle>
    <ConditionalRender
      Component={
        <ListComponent
          handleRedirect={handleRedirect}
          route={route}
          tableData={tableData}
        />
      }
      FallbackComponent={<EmptyList type={type} />}
      shouldRender={!!tableData.length}
    />
  </WatchListContainer>
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
