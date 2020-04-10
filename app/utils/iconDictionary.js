import React from 'react';
import styled from 'styled-components';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import Comments from '@material-ui/icons/Forum';
import CreditCard from '@material-ui/icons/CreditCard';
import Delete from '@material-ui/icons/Delete';
import Search from '@material-ui/icons/Search';
import Settings from '@material-ui/icons/Settings';
import Star from '@material-ui/icons/Star';
import Upvote from '@material-ui/icons/ArrowUpward';
import Verified from '@material-ui/icons/VerifiedUser';
import Warning from '@material-ui/icons/Warning';
import SiteLogo from './svg/SiteLogo';
import CloseMenu from './svg/CloseMenu';
import Glasses from './svg/Glasses';
import Paypal from './svg/Paypal';

export default (name, options) => {
  const icons = {
    closeMenu: CloseMenu,
    comments: Comments,
    creditCard: CreditCard,
    delete: Delete,
    glasses: Glasses,
    paypal: Paypal,
    search: Search,
    settings: Settings,
    siteLogo: SiteLogo,
    star: Star,
    successOutline: CheckCircleOutline,
    upvote: Upvote,
    verified: Verified,
    warning: Warning,
  };
  // Create style object to apply to SVG Icon
  const sizing = {};
  const styling = {};
  const stylesToApply = Object.assign({}, sizing, styling);
  const propsToPassDown = Object.assign({}, options);
  const IconToRender = icons[name];
  // Style Icon by applying to root styles
  const StyledIcon = styled(IconToRender)({ '&.root': stylesToApply });
  // Return Styled Icon w/ proper class selection
  return (
    <StyledIcon
      classes={{ root: 'root' }}
      className="styled-icon"
      {...propsToPassDown}
    />
  );
};
