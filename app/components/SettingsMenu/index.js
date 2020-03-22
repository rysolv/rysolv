import React, { Fragment } from 'react';
import T from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Settings } from 'components/base_ui';

const SettingsMenu = ({
  anchorEl,
  handleClick,
  handleClose,
  handleDelete,
  handleEdit,
}) => (
  <Fragment>
    <div
      aria-controls="settingsMenu"
      aria-haspopup="true"
      tabIndex={-1}
      role="button"
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <Settings />
    </div>

    <Menu
      id="settingsMenu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleEdit}>EDIT</MenuItem>
      <MenuItem onClick={handleDelete}>
        <span style={{ color: 'red' }}>DELETE</span>
      </MenuItem>
    </Menu>
  </Fragment>
);

SettingsMenu.propTypes = {
  anchorEl: T.object,
  handleClick: T.func.isRequired,
  handleClose: T.func.isRequired,
  handleDelete: T.func.isRequired,
  handleEdit: T.func.isRequired,
};

export default SettingsMenu;
