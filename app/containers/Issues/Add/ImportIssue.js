import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import ImportForm from 'components/Issues/Add/ImportForm';

import { incrementStep, inputChange, inputError } from '../actions';
import { validateInputs } from './helpers';
import { makeSelectIssues } from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class ImportIssue extends React.PureComponent {
  render() {
    const {
      data,
      dispatchInputError,
      handleIncrementStep,
      handleInputChange,
    } = this.props;
    const handleSubmit = () => {
      const validationErrors = validateInputs({ data });
      dispatchInputError({ errors: validationErrors });
      if (Object.keys(validationErrors).every(err => !validationErrors[err])) {
        handleIncrementStep({ step: 3, view: 'addIssue' });
      }
    };
    return (
      <Fragment>
        <ImportForm
          data={data}
          handleInputChange={handleInputChange}
          handleIncrementStep={handleIncrementStep}
          handleSubmit={handleSubmit}
        />
      </Fragment>
    );
  }
}

ImportIssue.propTypes = {
  data: T.object,
  dispatchInputError: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  data: makeSelectIssues('data'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchInputError: payload => dispatch(inputError(payload)),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImportIssue);
