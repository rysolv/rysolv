import React, { Fragment } from 'react';
import T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { ModalDialog } from 'components/base_ui';
import CloseIssueModal from 'components/CloseIssueModal';
import Header from 'components/Header';
import Footer from 'components/Footer';
import PaymentPortalModal from 'components/PaymentsModal';
import SideNav from 'components/SideNav';
import SigninModal from 'components/SigninModal';
import WatchList from 'components/WatchList';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import { makeSelectAuth } from 'containers/Auth/selectors';
import { signIn, signOut } from 'containers/Auth/actions';
import { closeIssue, deletePullRequest } from 'containers/Issues/actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { closeModalState, fetchWatchList } from './actions';
import reducer from './reducer';
import Routes from './routes';
import saga from './saga';
import { makeSelectMain } from './selectors';
import {
  AppBodyWrapper,
  AppContentWrapper,
  RoutesWrapper,
} from './styledComponents';

export const Main = ({
  activeUser,
  deviceView,
  dispatchCloseIssue,
  dispatchCloseModal,
  error,
  handleDelete,
  handleNav,
  handleSignin,
  handleSignout,
  isModalOpen,
  isSignedIn,
  loading,
  match,
  modal,
  tableData,
}) => {
  const { balance } = activeUser;
  const handleCloseIssue = ({ issueId, shouldClose }) => {
    dispatchCloseModal();
    dispatchCloseIssue({ issueId, shouldClose });
  };
  const handleDeletePullRequest = ({ pullRequestId, userId }) => {
    dispatchCloseModal();
    handleDelete({ pullRequestId, userId });
  };
  const handleRedirect = route => {
    dispatchCloseModal();
    handleNav(route);
  };
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
      Component: PaymentPortalModal,
      open: isModalOpen,
      propsToPassDown: {
        ...tableData,
        balance,
        handleClose: dispatchCloseModal,
        handleNav,
        isSignedIn,
      },
    },
    issueAttemptList: {
      Component: WatchList,
      open: isModalOpen,
      propsToPassDown: {
        handleClose: dispatchCloseModal,
        handleRedirect,
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
        handleRedirect,
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
        handleRedirect,
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
  };
  return (
    <Fragment>
      <AppBodyWrapper>
        <Header
          activeUser={activeUser}
          deviceView={deviceView}
          handleNav={handleNav}
          handleSignin={handleSignin}
          handleSignout={handleSignout}
          isSignedIn={isSignedIn}
        />
        <AppContentWrapper>
          <SideNav deviceView={deviceView} handleNav={handleNav} />
          <RoutesWrapper>
            <Routes error={error} loading={loading} match={match} />
          </RoutesWrapper>
        </AppContentWrapper>
      </AppBodyWrapper>
      <Footer handleNav={handleNav} />
      {modal && <ModalDialog {...modalPropsDictionary[modal]} />}
    </Fragment>
  );
};

Main.propTypes = {
  activeUser: T.object,
  deviceView: T.string,
  dispatchCloseIssue: T.func.isRequired,
  dispatchCloseModal: T.func.isRequired,
  error: T.object,
  handleClearAlerts: T.func,
  handleDelete: T.func,
  handleNav: T.func,
  handleSignin: T.func,
  handleSignout: T.func,
  isModalOpen: T.bool,
  isSignedIn: T.bool,
  loading: T.bool,
  match: T.object,
  modal: T.string,
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
  dispatchFetchWatchList: payload => dispatch(fetchWatchList(payload)),
  dispatchCloseModal: () => dispatch(closeModalState()),
  /*
   * Reducer : PullRequests
   */
  handleDelete: payload => dispatch(deletePullRequest(payload)),
  /*
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
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
