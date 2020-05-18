import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import ImportForm from 'components/Issues/Add/ImportForm';

import {
  incrementStep,
  inputChange,
  inputError,
  importIssue,
} from '../actions';
// import { validateInputs } from './helpers';
import { makeSelectIssues } from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class ImportIssue extends React.PureComponent {
  render() {
    const {
      data,
      dispatchImportIssue,
      // dispatchInputError,
      handleIncrementStep,
      handleInputChange,
    } = this.props;
    const handleSubmit = () => {
      const {
        importUrl: { value: url },
      } = data;
      dispatchImportIssue({ url });
      // const validationErrors = validateInputs({ data });
      // dispatchInputError({ errors: validationErrors });
      // if (Object.keys(validationErrors).every(err => !validationErrors[err])) {
      //   handleIncrementStep({ step: 3, view: 'addIssue' });
      // }
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
  dispatchImportIssue: T.func,
  // dispatchInputError: T.func,
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
    dispatchImportIssue: payload => dispatch(importIssue(payload)),
    dispatchInputError: payload => dispatch(inputError(payload)),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImportIssue);
