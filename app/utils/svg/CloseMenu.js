import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function CloseMenu(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 500 500">
      <path
        clipRule="evenodd"
        d="M483 456.3L275.7 249 483 41.7 456.3 15 249 222.3 41.7 15 15 41.7 222.3 249 15 456.3 41.7 483 249 275.7 456.3 483z"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
}

export default CloseMenu;
