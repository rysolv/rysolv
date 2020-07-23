import React from 'react';
import styled from 'styled-components';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Add from '@material-ui/icons/Add';
import AddCircle from '@material-ui/icons/AddCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Attempt from '@material-ui/icons/ListAlt';
import Cancel from '@material-ui/icons/Cancel';
import Check from '@material-ui/icons/Check';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import Circle from '@material-ui/icons/FiberManualRecord';
import Close from '@material-ui/icons/Close';
import CloseCircle from '@material-ui/icons/HighlightOff';
import Code from '@material-ui/icons/Code';
import Comments from '@material-ui/icons/Forum';
import Computer from '@material-ui/icons/Computer';
import CreditCard from '@material-ui/icons/CreditCard';
import Delete from '@material-ui/icons/Delete';
import Dollar from '@material-ui/icons/AttachMoney';
import Done from '@material-ui/icons/Done';
import Edit from '@material-ui/icons/Edit';
import Email from '@material-ui/icons/Email';
import ErrorIcon from '@material-ui/icons/Error';
import Exit from '@material-ui/icons/ExitToApp';
import Facebook from '@material-ui/icons/Facebook';
import Four from '@material-ui/icons/Looks4Outlined';
import Gift from '@material-ui/icons/Redeem';
import GitHub from '@material-ui/icons/GitHub';
import Info from '@material-ui/icons/Info';
import Link from '@material-ui/icons/Link';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import One from '@material-ui/icons/LooksOneOutlined';
import PublishIcon from '@material-ui/icons/Publish';
import PullRequest from '@material-ui/icons/AccountTree';
import Search from '@material-ui/icons/Search';
import Settings from '@material-ui/icons/Settings';
import Star from '@material-ui/icons/Star';
import Three from '@material-ui/icons/Looks3Outlined';
import Twitter from '@material-ui/icons/Twitter';
import Two from '@material-ui/icons/LooksTwoOutlined';
import Upvote from '@material-ui/icons/ArrowUpward';
import Verified from '@material-ui/icons/VerifiedUser';
import ViewAll from '@material-ui/icons/NavigateNext';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Warning from '@material-ui/icons/Warning';
import WebIcon from '@material-ui/icons/Web';

import CloseMenu from './svg/CloseMenu';
import Gitlab from './svg/Gitlab';
import Monocle from './svg/Monocle';
import Paypal from './svg/Paypal';
import SiteLogo from './svg/SiteLogo';
import Stackoverflow from './svg/Stackoverflow';

export default (name, options) => {
  const icons = {
    add: Add,
    addCircle: AddCircle,
    attempt: Attempt,
    backArrow: ArrowBackIcon,
    backArrowHalf: ArrowBackIosIcon,
    cancel: Cancel,
    check: Check,
    circle: Circle,
    close: Close,
    closeCircle: CloseCircle,
    closeMenu: CloseMenu,
    code: Code,
    comments: Comments,
    computer: Computer,
    creditCard: CreditCard,
    delete: Delete,
    dollar: Dollar,
    done: Done,
    dropdownArrow: ArrowDropDownIcon,
    edit: Edit,
    email: Email,
    exit: Exit,
    facebook: Facebook,
    forwardArrowHalf: ArrowForwardIosIcon,
    four: Four,
    funded: MonetizationOn,
    gift: Gift,
    github: GitHub,
    gitlab: Gitlab,
    info: Info,
    issue: ErrorIcon,
    link: Link,
    monocle: Monocle,
    one: One,
    organization: WebIcon,
    paypal: Paypal,
    pullRequest: PullRequest,
    search: Search,
    settings: Settings,
    siteLogo: SiteLogo,
    stackoverflow: Stackoverflow,
    star: Star,
    successOutline: CheckCircleOutline,
    three: Three,
    twitter: Twitter,
    two: Two,
    upload: PublishIcon,
    upvote: Upvote,
    user: AccountCircleIcon,
    verified: Verified,
    viewAll: ViewAll,
    visibility: Visibility,
    visibilityOff: VisibilityOff,
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
