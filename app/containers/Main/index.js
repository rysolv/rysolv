import React, { Fragment } from 'react';
import T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import CloseIssueModal from 'components/CloseIssueModal';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SideNav from 'components/SideNav';
import SigninModal from 'components/SigninModal';
import VerifyAccountModal from 'components/VerifyAccountModal';
import WatchList from 'components/WatchList';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import { makeSelectAuth } from 'containers/Auth/selectors';
import { clearAlerts, signIn, signOut } from 'containers/Auth/actions';
import { closeIssue, deletePullRequest } from 'containers/Issues/actions';
import PaymentsPortal from 'containers/Payments';
import { resetState } from 'containers/Signin/actions';
import { getCookie, setCookie } from 'utils/globalHelpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { closeModalState } from './actions';
import reducer from './reducer';
import Routes from './routes';
import saga from './saga';
import { makeSelectMain } from './selectors';
import {
  AppBodyWrapper,
  AppContentWrapper,
  RoutesWrapper,
  StyledModalDialog,
} from './styledComponents';

class Main extends React.PureComponent {
  componentDidMount() {
    if (!getCookie('returnUser')) {
      setCookie('returnUser', true, {
        expires: 'Sun, 19 Jan 2038 00:00:01 GMT;',
      });
    }
  }

  componentDidUpdate({ location: { pathname: prevPathname } }) {
    const {
      handleClearAuthAlerts,
      location: { pathname },
    } = this.props;
    const origin = pathname.split('/')[1];
    const prevOrigin = prevPathname.split('/')[1];
    if (origin !== prevOrigin) handleClearAuthAlerts();
  }

  render() {
    const {
      activeUser,
      deviceView,
      dispatchCloseIssue,
      dispatchCloseModal,
      handleDelete,
      handleNav,
      handleResetState,
      handleSignout,
      isModalOpen,
      isSignedIn,
      location,
      modal,
      tableData,
    } = this.props;
    const handleCloseIssue = ({ issueId, shouldClose }) => {
      dispatchCloseModal();
      dispatchCloseIssue({ issueId, shouldClose });
    };
    const handleDeletePullRequest = ({ pullRequestId }) => {
      dispatchCloseModal();
      handleDelete({ pullRequestId });
    };
    const handleRedirect = route => {
      dispatchCloseModal();
      handleNav(route);
    };
    const { pathname } = window.location;
    const basePathname = pathname.split('/')[1];
    const isLandingOrRecruitmentPage =
      basePathname === 'company' ||
      basePathname === 'messages' ||
      pathname === '/' ||
      pathname === '/how-we-score-code' ||
      pathname === '/jobs' ||
      pathname === '/password-reset' ||
      pathname === '/recruitment' ||
      pathname === '/signin' ||
      pathname === '/signup';
    const isPaymentModal = modal === 'fundIssue';
    const modalPropsDictionary = {
      closeIssue: {
        Component: CloseIssueModal,
        open: isModalOpen,
        propsToPassDown: {
          dispatchCloseIssue,
          handleClose: dispatchCloseModal,
          handleCloseIssue,
          tableData,
        },
      },
      fundIssue: {
        Component: PaymentsPortal,
        open: isModalOpen,
        propsToPassDown: {
          handleClose: dispatchCloseModal,
          isModal: true,
          isSignedIn,
          ...tableData,
        },
      },
      issueAttemptList: {
        Component: WatchList,
        open: isModalOpen,
        propsToPassDown: {
          handleClose: dispatchCloseModal,
          route: '/users/detail',
          tableData,
          title: 'Attempt List',
          type: 'issueAttemptList',
        },
      },
      issueWatchList: {
        Component: WatchList,
        open: isModalOpen,
        propsToPassDown: {
          handleClose: dispatchCloseModal,
          route: '/users/detail',
          tableData,
          title: 'Watch List',
          type: 'issueWatchList',
        },
      },
      pullRequestList: {
        Component: WatchList,
        open: isModalOpen,
        propsToPassDown: {
          handleClose: dispatchCloseModal,
          handleDeletePullRequest,
          isSignedIn,
          route: '/users/detail',
          tableData,
          title: 'Pull Requests',
          type: 'pullRequestList',
        },
      },
      signIn: {
        Component: SigninModal,
        open: isModalOpen,
        propsToPassDown: {
          handleClose: dispatchCloseModal,
          handleRedirect,
        },
      },
      verifyAccount: {
        Component: VerifyAccountModal,
        open: isModalOpen,
        propsToPassDown: {
          handleClose: dispatchCloseModal,
          handleRedirect,
        },
      },
    };
    return (
      <Fragment>
        <AppBodyWrapper isLandingOrRecruitmentPage={isLandingOrRecruitmentPage}>
          <Header
            activeUser={activeUser}
            deviceView={deviceView}
            handleNav={handleNav}
            handleResetState={handleResetState}
            handleSignout={handleSignout}
            isSignedIn={isSignedIn}
            location={location}
          />
          <AppContentWrapper>
            <SideNav deviceView={deviceView} handleNav={handleNav} />
            <RoutesWrapper
              isLandingOrRecruitmentPage={isLandingOrRecruitmentPage}
            >
              <Routes />
            </RoutesWrapper>
          </AppContentWrapper>
        </AppBodyWrapper>
        <Footer />
        {modal && (
          <StyledModalDialog
            isPaymentModal={isPaymentModal}
            {...modalPropsDictionary[modal]}
          />
        )}
      </Fragment>
    );
  }
}

Main.propTypes = {
  activeUser: T.object.isRequired,
  deviceView: T.string.isRequired,
  dispatchCloseIssue: T.func.isRequired,
  dispatchCloseModal: T.func.isRequired,
  handleClearAuthAlerts: T.func.isRequired,
  handleDelete: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleResetState: T.func.isRequired,
  handleSignin: T.func.isRequired,
  handleSignout: T.func.isRequired,
  isModalOpen: T.bool.isRequired,
  isSignedIn: T.bool.isRequired,
  location: T.object.isRequired,
  modal: T.string.isRequired,
  tableData: T.oneOfType([T.array, T.object, T.number]),
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer: Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  isSignedIn: makeSelectAuth('isSignedIn'),
  /**
   * Reducer: Main
   */
  isModalOpen: makeSelectMain('isModalOpen'),
  modal: makeSelectMain('modal'),
  tableData: makeSelectMain('tableData'),
  /**
   * Reducer: ViewSizes
   */
  deviceView: makeSelectViewSize('deviceView'),
});

const mapDispatchToProps = dispatch => ({
  /**
   * Auth
   */
  handleClearAuthAlerts: () => dispatch(clearAlerts()),
  handleSignin: payload => dispatch(signIn(payload)),
  handleSignout: () => dispatch(signOut()),
  /**
   * Issues
   */
  dispatchCloseIssue: payload => dispatch(closeIssue(payload)),
  /**
   * Main
   */
  dispatchCloseModal: () => dispatch(closeModalState()),
  /*
   * Reducer : PullRequests
   */
  handleDelete: payload => dispatch(deletePullRequest(payload)),
  /*
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
  /*
   * Reducer : Signin
   */
  handleResetState: () => dispatch(resetState()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'main', reducer });
const withSaga = injectSaga({ key: 'main', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(Main),
);
