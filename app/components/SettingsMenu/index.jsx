import React, { Fragment, useState } from 'react';
import T from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Settings } from 'components/base_ui';

const SettingsMenu = ({
  deleteRoute,
  editRoute,
  handleDelete,
  handleFetchInfo,
  handleNav,
  id,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const clickHandler = event => {
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

  const deleteHandler = ({ itemId }) => {
    handleDelete({ itemId });
    handleNav(deleteRoute);
    setAnchorEl(null);
  };

  const editHandler = ({ itemId }) => {
    handleFetchInfo({ itemId });
    handleNav(editRoute);
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <div
        aria-controls="settingsMenu"
        aria-haspopup="true"
        tabIndex={-1}
        role="button"
        onClick={clickHandler}
        onKeyDown={clickHandler}
      >
        <Settings />
      </div>

      <Menu
        id="settingsMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeHandler}
      >
        <MenuItem onClick={() => editHandler({ itemId: id })}>EDIT</MenuItem>
        <MenuItem onClick={() => deleteHandler({ itemId: id })}>
          <span style={{ color: 'red' }}>DELETE</span>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

SettingsMenu.propTypes = {
  deleteRoute: T.string.isRequired,
  editRoute: T.string.isRequired,
  handleDelete: T.func.isRequired,
  handleFetchInfo: T.func.isRequired,
  handleNav: T.func.isRequired,
  id: T.string.isRequired,
};

export default SettingsMenu;
