import React, { Fragment, useEffect } from 'react';
import T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import CloseIssueModal from 'components/CloseIssueModal';
import ProgressModal from 'components/ProgressModal';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SideNav from 'components/SideNav';
import SigninModal from 'components/SigninModal';
import VerifyAccountModal from 'components/VerifyAccountModal';
import WatchList from 'components/WatchList';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import { makeSelectAuth } from 'containers/Auth/selectors';
import { signIn, signOut } from 'containers/Auth/actions';
import { closeIssue, deletePullRequest } from 'containers/Issues/actions';
import PaymentsPortal from 'containers/Payments';
import { resetState } from 'containers/Signin/actions';
import { getCookie, setCookie } from 'utils/globalHelpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { closeModalState, openModalState } from './actions';
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

export const Main = ({
  activeUser,
  deviceView,
  dispatchCloseIssue,
  dispatchCloseModal,
  dispatchOpenModal,
  handleDelete,
  handleNav,
  handleResetState,
  handleSignin,
  handleSignout,
  isModalOpen,
  isSignedIn,
  modal,
  tableData,
}) => {
  useEffect(() => {
    if (!getCookie('returnUser')) {
      dispatchOpenModal({ modalState: 'progress' });
      setCookie('returnUser', true);
    }
  }, []);

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
    progress: {
      Component: ProgressModal,
      open: isModalOpen,
      propsToPassDown: {
        handleClose: dispatchCloseModal,
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
      <AppBodyWrapper>
        <Header
          activeUser={activeUser}
          deviceView={deviceView}
          handleNav={handleNav}
          handleResetState={handleResetState}
          handleSignin={handleSignin}
          handleSignout={handleSignout}
          isSignedIn={isSignedIn}
        />
        <AppContentWrapper>
          <SideNav deviceView={deviceView} handleNav={handleNav} />
          <RoutesWrapper>
            <Routes />
          </RoutesWrapper>
        </AppContentWrapper>
      </AppBodyWrapper>
      <Footer handleNav={handleNav} />
      {modal && (
        <StyledModalDialog
          isPaymentModal={isPaymentModal}
          {...modalPropsDictionary[modal]}
        />
      )}
    </Fragment>
  );
};

Main.propTypes = {
  activeUser: T.object.isRequired,
  deviceView: T.string.isRequired,
  dispatchCloseIssue: T.func.isRequired,
  dispatchCloseModal: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  handleDelete: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleResetState: T.func.isRequired,
  handleSignin: T.func.isRequired,
  handleSignout: T.func.isRequired,
  isModalOpen: T.bool.isRequired,
  isSignedIn: T.bool.isRequired,
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
  dispatchOpenModal: payload => dispatch(openModalState(payload)),
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
