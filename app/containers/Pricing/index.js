import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router-dom';

import PricingView from 'components/Pricing';

import { ViewContainer } from './styledComponents';

const Pricing = ({ handleNav }) => {
  const handleSelectPlan = () => {
    handleNav('/signup?type=company');
  };

  return (
    <ViewContainer>
      <PricingView handleSelectPlan={handleSelectPlan} />
    </ViewContainer>
  );
};

Pricing.propTypes = { handleNav: T.func.isRequired };

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withRouter(compose(withConnect)(Pricing));
