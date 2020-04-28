import React from 'react';
import styled from 'styled-components';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Attempt from '@material-ui/icons/ListAlt';
import Cancel from '@material-ui/icons/Cancel';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import Circle from '@material-ui/icons/FiberManualRecord';
import CodeIcon from '@material-ui/icons/Code';
import Comments from '@material-ui/icons/Forum';
import CreditCard from '@material-ui/icons/CreditCard';
import Delete from '@material-ui/icons/Delete';
import Exit from '@material-ui/icons/ExitToApp';
import Gift from '@material-ui/icons/Redeem';
import GitHub from '@material-ui/icons/GitHub';
import Link from '@material-ui/icons/Link';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import PullRequest from '@material-ui/icons/AccountTree';
import Search from '@material-ui/icons/Search';
import Settings from '@material-ui/icons/Settings';
import Star from '@material-ui/icons/Star';
import Upvote from '@material-ui/icons/ArrowUpward';
import Verified from '@material-ui/icons/VerifiedUser';
import Warning from '@material-ui/icons/Warning';

import SiteLogo from './svg/SiteLogo';
import Stackoverflow from './svg/Stackoverflow';
import Paypal from './svg/Paypal';
import Monocle from './svg/Monocle';
import Gitlab from './svg/Gitlab';
import CloseMenu from './svg/CloseMenu';

export default (name, options) => {
  const icons = {
    attempt: Attempt,
    backArrow: ArrowBackIcon,
    cancel: Cancel,
    circle: Circle,
    closeMenu: CloseMenu,
    code: CodeIcon,
    comments: Comments,
    creditCard: CreditCard,
    delete: Delete,
    dropdownArrow: ArrowDropDownIcon,
    exit: Exit,
    funded: MonetizationOn,
    gift: Gift,
    github: GitHub,
    gitlab: Gitlab,
    link: Link,
    monocle: Monocle,
    paypal: Paypal,
    pullRequest: PullRequest,
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
