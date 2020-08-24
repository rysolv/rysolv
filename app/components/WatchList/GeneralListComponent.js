import React from 'react';
import T from 'prop-types';

import { ImageLinkWrapper } from 'components/base_ui';

import {
  ListContainer,
  ListDetail,
  ListItemWrapper,
  Username,
} from './styledComponents';

const GeneralListComponent = ({ handleClose, route, tableData }) => (
  <ListContainer>
    {tableData.map(({ id, username, profilePic }) => (
      <ListItemWrapper key={`list-item-${id}`}>
        <ListDetail>
          <ImageLinkWrapper
            alt={username}
            image={profilePic}
            onClick={handleClose}
            route={`${route}/${id}`}
            size="3.5rem"
          />
          <Username onClick={handleClose} to={`${route}/${id}`}>
            {username}
          </Username>
        </ListDetail>
      </ListItemWrapper>
    ))}
  </ListContainer>
);

GeneralListComponent.propTypes = {
  handleClose: T.func.isRequired,
  route: T.string.isRequired,
  tableData: T.array.isRequired,
};

export default GeneralListComponent;
