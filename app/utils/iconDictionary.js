import React from 'react';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Add from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';
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
import Flare from '@material-ui/icons/Flare';
import Gift from '@material-ui/icons/Redeem';
import GitHub from '@material-ui/icons/GitHub';
import Help from '@material-ui/icons/Help';
import Info from '@material-ui/icons/Info';
import Link from '@material-ui/icons/Link';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import PublishIcon from '@material-ui/icons/Publish';
import PullRequest from '@material-ui/icons/AccountTree';
import Search from '@material-ui/icons/Search';
import Settings from '@material-ui/icons/Settings';
import Stats from '@material-ui/icons/Equalizer';
import Twitter from '@material-ui/icons/Twitter';
import Verified from '@material-ui/icons/VerifiedUser';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Warning from '@material-ui/icons/Warning';
import WebIcon from '@material-ui/icons/Web';

import CloseMenu from './svg/CloseMenu';
import Coin from './svg/RysolvCoin';
import Gitlab from './svg/Gitlab';
import Monocle from './svg/Monocle';
import Paypal from './svg/Paypal';
import SiteLogo from './svg/SiteLogo';
import Stackoverflow from './svg/Stackoverflow';

import { iconSize, iconStyle } from '../defaultStyleHelper';

export default (name, size, style) => {
  const icons = {
    add: Add,
    addBox: AddBoxIcon,
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
    coin: Coin,
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
    flare: Flare,
    forwardArrowHalf: ArrowForwardIosIcon,
    funded: MonetizationOn,
    gift: Gift,
    github: GitHub,
    gitlab: Gitlab,
    help: Help,
    info: Info,
    issue: ErrorIcon,
    link: Link,
    monocle: Monocle,
    navigateBefore: NavigateBefore,
    navigateNext: NavigateNext,
    paypal: Paypal,
    pullRequest: PullRequest,
    repo: WebIcon,
    search: Search,
    settings: Settings,
    siteLogo: SiteLogo,
    stackoverflow: Stackoverflow,
    stats: Stats,
    successOutline: CheckCircleOutline,
    twitter: Twitter,
    upload: PublishIcon,
    user: AccountCircleIcon,
    verified: Verified,
    visibility: Visibility,
    visibilityOff: VisibilityOff,
    warning: Warning,
  };
  const IconToRender = icons[name];
  return <IconToRender style={{ ...iconSize[size], ...iconStyle[style] }} />;
};
