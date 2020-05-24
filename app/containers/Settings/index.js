import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import SettingsView from 'components/Settings';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  clearAlerts,
  deleteUser,
  fetchInfo,
  inputChange,
  removeIssue,
  saveChange,
} from './actions';
import { settingViewDictionary } from './constants';
import reducer from './reducer';
import saga from './saga';
import { makeSelectSettings } from './selectors';
import { SettingsWrapper } from './styledComponents';

const Settings = ({
  activeUser: { id },
  alerts,
  data,
  dispatchFetchInfo,
  dispatchSaveChange,
  error,
  filterValues,
  handleClearAlerts,
  handleDeleteUser,
  handleInputChange,
  handleNav,
  handleRemoveIssue,
  loading,
  match,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'User Settings';
    dispatchFetchInfo({ itemId: id });
  }, [id]);
  const {
    params: { view },
  } = match;
  const currentTab = settingViewDictionary[view] || 0;
  return (
    <SettingsWrapper>
      <AsyncRender
        asyncData={data}
        component={SettingsView}
        error={error}
        isRequiredData
        loading={loading}
        propsToPassDown={{
          alerts,
          currentTab,
          dispatchSaveChange,
          filterValues,
          handleClearAlerts,
          handleDeleteUser,
          handleInputChange,
          handleNav,
          handleRemoveIssue,
        }}
      />
    </SettingsWrapper>
  );
};

Settings.propTypes = {
  activeUser: T.object,
  alerts: T.object.isRequired,
  data: T.object,
  dispatchFetchInfo: T.func,
  dispatchSaveChange: T.func,
  error: T.oneOfType([T.object, T.bool]).isRequired,
  filterValues: T.object,
  handleClearAlerts: T.func.isRequired,
  handleDeleteUser: T.func.isRequired,
  handleInputChange: T.func,
  handleNav: T.func.isRequired,
  handleRemoveIssue: T.func.isRequired,
  loading: T.bool.isRequired,
  match: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Main
   */
  activeUser: makeSelectAuth('activeUser'),
  /**
   * Reducer : Settings
   */
  alerts: makeSelectSettings('alerts'),
  data: makeSelectSettings('account'),
  error: makeSelectSettings('error'),
  filterValues: makeSelectSettings('filter'),
  loading: makeSelectSettings('loading'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Settings
     */
    dispatchFetchInfo: payload => dispatch(fetchInfo(payload)),
    dispatchSaveChange: payload => dispatch(saveChange(payload)),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleDeleteUser: payload => dispatch(deleteUser(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
    handleRemoveIssue: payload => dispatch(removeIssue(payload)),
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'settings', reducer });
const withSaga = injectSaga({ key: 'settings', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Settings);
