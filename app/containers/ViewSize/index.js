import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { throttle } from 'lodash';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import { changeResponsiveView } from './actions';
import { deviceViewToRender } from './helpers';
import reducer from './reducer';
import makeSelectViewSize from './selectors';

export class ViewSize extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.changeLayoutView);
    this.changeLayoutView();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeLayoutView);
  }

  changeLayoutView = throttle(() => {
    const { deviceView, dispatchChangeResponsiveView } = this.props;
    // looking at window inner width if not present user is on mobile device
    const windowScreenWidth =
      window.innerWidth > 0 ? window.innerWidth : window.screen.width;
    const currentDeviceByWidth = deviceViewToRender(windowScreenWidth);
    if (deviceView !== currentDeviceByWidth) {
      dispatchChangeResponsiveView(currentDeviceByWidth);
    }
  }, 400);

  render() {
    const { children } = this.props;
    return children;
  }
}

ViewSize.propTypes = {
  children: T.arrayOf(T.node),
  deviceView: T.string.isRequired,
  dispatchChangeResponsiveView: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : ViewSize
   */
  deviceView: makeSelectViewSize('deviceView'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : ViewSize
     */
    dispatchChangeResponsiveView: payload =>
      dispatch(changeResponsiveView(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'viewSize', reducer });

export default withRouter(
  compose(
    withReducer,
    withConnect,
  )(ViewSize),
);
