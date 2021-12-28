import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router-dom';

import makeSelectViewSize from 'containers/ViewSize/selectors';
import CompanyPricingView from 'components/CompanyPricing';

import { ViewContainer } from './styledComponents';

const Pricing = ({ deviceView, handleNav }) => {
  const handleSelectPlan = () => {
    handleNav('/signup?type=company');
  };

  return (
    <ViewContainer>
      <CompanyPricingView
        deviceView={deviceView}
        handleSelectPlan={handleSelectPlan}
      />
    </ViewContainer>
  );
};

Pricing.propTypes = {
  deviceView: T.string.isRequired,
  handleNav: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer: ViewSizes
   */
  deviceView: makeSelectViewSize('deviceView'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(compose(withConnect)(Pricing));
