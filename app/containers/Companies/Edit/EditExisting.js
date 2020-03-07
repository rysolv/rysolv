import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { incrementStep, inputChange, inputError } from '../actions';
import { makeSelectCompanies } from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class EditExisting extends React.PureComponent {
  render() {
    return <div>Hello</div>;
  }
}

EditExisting.propTypes = {};

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
    dispatchInputError: payload => dispatch(inputError(payload)),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditExisting);
