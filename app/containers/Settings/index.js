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

import { fetchInfo, inputChange } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectSettings } from './selectors';
import { SettingsWrapper } from './styledComponents';

const Settings = ({
  activeUser: { id },
  currentTab,
  data,
  dispatchFetchInfo,
  error,
  filterValues,
  handleInputChange,
  handleNav,
  loading,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'User Settings';
    dispatchFetchInfo({ itemId: id });
  }, [id]);

  return (
    <SettingsWrapper>
      <AsyncRender
        asyncData={data}
        component={SettingsView}
        error={error}
        isRequiredData
        loading={loading}
        propsToPassDown={{
          currentTab,
          filterValues,
          handleInputChange,
          handleNav,
        }}
      />
    </SettingsWrapper>
  );
};

Settings.propTypes = {
  activeUser: T.object,
  currentTab: T.number,
  data: T.object,
  dispatchFetchInfo: T.func,
  error: T.oneOfType([T.object, T.bool]).isRequired,
  filterValues: T.object,
  handleInputChange: T.func,
  handleNav: T.func.isRequired,
  loading: T.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Main
   */
  activeUser: makeSelectAuth('activeUser'),
  /**
   * Reducer : Settings
   */
  currentTab: makeSelectSettings('currentTab'),
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
    handleInputChange: payload => dispatch(inputChange(payload)),
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
