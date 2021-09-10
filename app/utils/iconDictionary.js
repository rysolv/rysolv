import React from 'react';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Add from '@material-ui/icons/Add';
import AddBox from '@material-ui/icons/AddBox';
import AddCircle from '@material-ui/icons/AddCircle';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Attempt from '@material-ui/icons/ListAlt';
import Bookmark from '@material-ui/icons/Bookmark';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import Cancel from '@material-ui/icons/Cancel';
import Check from '@material-ui/icons/Check';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import Close from '@material-ui/icons/Close';
import CloseCircle from '@material-ui/icons/HighlightOff';
import Code from '@material-ui/icons/Code';
import Comments from '@material-ui/icons/Forum';
import Computer from '@material-ui/icons/Computer';
import CreditCard from '@material-ui/icons/CreditCard';
import Done from '@material-ui/icons/Done';
import Edit from '@material-ui/icons/Edit';
import Email from '@material-ui/icons/Email';
import ErrorIcon from '@material-ui/icons/Error';
import Exit from '@material-ui/icons/ExitToApp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Facebook from '@material-ui/icons/Facebook';
import Flare from '@material-ui/icons/Flare';
import Gift from '@material-ui/icons/Redeem';
import GitHub from '@material-ui/icons/GitHub';
import Help from '@material-ui/icons/Help';
import Info from '@material-ui/icons/Info';
import Language from '@material-ui/icons/Language';
import Link from '@material-ui/icons/Link';
import LocalAtm from '@material-ui/icons/LocalAtm';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import Publish from '@material-ui/icons/Publish';
import PullRequest from '@material-ui/icons/AccountTree';
import Remove from '@material-ui/icons/Remove';
import Search from '@material-ui/icons/Search';
import Settings from '@material-ui/icons/Settings';
import Star from '@material-ui/icons/Star';
import Stats from '@material-ui/icons/Equalizer';
import Twitter from '@material-ui/icons/Twitter';
import Verified from '@material-ui/icons/VerifiedUser';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Warning from '@material-ui/icons/Warning';
import Web from '@material-ui/icons/Web';
import WorkOutline from '@material-ui/icons/WorkOutline';

import BackgroundHollowCircle from './svg/BackgroundHollowCircle';
import BackgroundSolidCircle from './svg/BackgroundSolidCircle';
import CloseMenu from './svg/CloseMenu';
import Coin from './svg/RysolvCoin';
import DarkSiteLogo from './svg/DarkSiteLogo';
import Discord from './svg/Discord';
import HeaderImageLeft from './svg/HeaderImageLeft';
import HeaderImageRight from './svg/HeaderImageRight';
import Javascript from './svg/Javascript';
import Monocle from './svg/Monocle';
import Paypal from './svg/Paypal';
import Python from './svg/Python';
import ReactIcon from './svg/React';
import RecruitmentHeaderImageRight from './svg/RecruitmentHeaderImageRight';
import Ruby from './svg/Ruby';
import SiteLogo from './svg/SiteLogo';
import SiteWordmark from './svg/SiteWordmark';
import Stackoverflow from './svg/Stackoverflow';

import { iconSize, iconStyle } from '../defaultStyleHelper';

export default (name, size, style) => {
  const icons = {
    add: Add,
    addBox: AddBox,
    addCircle: AddCircle,
    attempt: Attempt,
    backArrow: ArrowBack,
    backArrowHalf: ArrowBackIos,
    backgroundHollowCircle: BackgroundHollowCircle,
    backgroundSolidCircle: BackgroundSolidCircle,
    bookmark: Bookmark,
    bookmarkBorder: BookmarkBorder,
    cancel: Cancel,
    check: Check,
    close: Close,
    closeCircle: CloseCircle,
    closeMenu: CloseMenu,
    code: Code,
    coin: Coin,
    comments: Comments,
    computer: Computer,
    creditCard: CreditCard,
    darkSiteLogo: DarkSiteLogo,
    discord: Discord,
    dollarSquare: LocalAtm,
    done: Done,
    dropdownArrow: ArrowDropDown,
    edit: Edit,
    email: Email,
    exit: Exit,
    expandLess: ExpandLess,
    expandMore: ExpandMore,
    facebook: Facebook,
    flare: Flare,
    forwardArrowHalf: ArrowForwardIos,
    funded: MonetizationOn,
    gift: Gift,
    github: GitHub,
    headerImageLeft: HeaderImageLeft,
    headerImageRight: HeaderImageRight,
    help: Help,
    info: Info,
    issue: ErrorIcon,
    javascript: Javascript,
    language: Language,
    link: Link,
    monocle: Monocle,
    navigateBefore: NavigateBefore,
    navigateNext: NavigateNext,
    paypal: Paypal,
    pullRequest: PullRequest,
    python: Python,
    reactIcon: ReactIcon,
    recruitmentHeaderImageRight: RecruitmentHeaderImageRight,
    remove: Remove,
    repo: Web,
    ruby: Ruby,
    search: Search,
    settings: Settings,
    siteLogo: SiteLogo,
    siteWordmark: SiteWordmark,
    stackoverflow: Stackoverflow,
    star: Star,
    stats: Stats,
    successOutline: CheckCircleOutline,
    twitter: Twitter,
    upload: Publish,
    user: AccountCircle,
    verified: Verified,
    visibility: Visibility,
    visibilityOff: VisibilityOff,
    warning: Warning,
    workOutline: WorkOutline,
  };
  const IconToRender = icons[name];
  return <IconToRender style={{ ...iconSize[size], ...iconStyle[style] }} />;
};
