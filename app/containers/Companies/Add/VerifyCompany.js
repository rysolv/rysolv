import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { PrimaryButton, PrimaryAsyncButton } from 'components/base_ui';

import { incrementStep } from '../actions';
import { companyDataDictionary } from '../constants';
import { makeSelectCompanies } from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyAdd extends React.PureComponent {
  render() {
    const { data, handleNav, handleIncrementStep } = this.props;
    return (
      <div>
        {Object.keys(data).map(item => (
          <div key={`verify-${item}`}>
            {companyDataDictionary[item]}:<div>{data[item].value}</div>
          </div>
        ))}
        <PrimaryButton
          label="Back"
          onClick={() => handleIncrementStep({ step: 2, view: 'addCompany' })}
        />
        <PrimaryAsyncButton
          label="Save"
          onClick={() => handleNav({ subroute: 'companies' })}
        />
      </div>
    );
  }
}

VerifyAdd.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
  handleNav: T.func,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Companies
   */
  data: makeSelectCompanies('data'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Companies
     */
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    /**
     * Reducer : Router
     */
    handleNav: ({ subroute }) => {
      dispatch(push(`/admin/${subroute}`));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyAdd);
