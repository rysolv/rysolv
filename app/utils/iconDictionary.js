import React from 'react';
import styled from 'styled-components';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import Circle from '@material-ui/icons/FiberManualRecord';
import CodeIcon from '@material-ui/icons/Code';
import Comments from '@material-ui/icons/Forum';
import CreditCard from '@material-ui/icons/CreditCard';
import Delete from '@material-ui/icons/Delete';
import GitHub from '@material-ui/icons/GitHub';
import Link from '@material-ui/icons/Link';
import Search from '@material-ui/icons/Search';
import Settings from '@material-ui/icons/Settings';
import Star from '@material-ui/icons/Star';
import Upvote from '@material-ui/icons/ArrowUpward';
import Verified from '@material-ui/icons/VerifiedUser';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Warning from '@material-ui/icons/Warning';
import SiteLogo from './svg/SiteLogo';
import CloseMenu from './svg/CloseMenu';
import Gitlab from './svg/Gitlab';
import Monocle from './svg/Monocle';
import Paypal from './svg/Paypal';
import Stackoverflow from './svg/Stackoverflow';

export default (name, options) => {
  const icons = {
    backArrow: ArrowBackIcon,
    circle: Circle,
    closeMenu: CloseMenu,
    code: CodeIcon,
    comments: Comments,
    creditCard: CreditCard,
    delete: Delete,
    github: GitHub,
    gitlab: Gitlab,
    link: Link,
    monocle: Monocle,
    paypal: Paypal,
    search: Search,
    settings: Settings,
    siteLogo: SiteLogo,
    stackoverflow: Stackoverflow,
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
