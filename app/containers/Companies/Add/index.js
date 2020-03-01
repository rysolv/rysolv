import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import AddCompanyView from 'components/Companies/AddCompanyView';
import { inputChange, inputError } from '../actions';
import { validateInputs } from './helpers';
import { makeCompanyErrors, makeCompanyInputs } from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class AddCompany extends React.PureComponent {
  render() {
    const {
      dispatchInputError,
      errors,
      handleInputChange,
      inputs,
    } = this.props;
    const handleSubmit = () => {
      const validationErrors = validateInputs({ inputs });
      dispatchInputError({
        category: 'importUrl',
        errors: validationErrors,
        view: 'add',
      });
      if (isEmpty(validationErrors)) {
        console.log('Done');
      }
    };
    return (
      <AddCompanyView
        errors={errors}
        handleInputChange={handleInputChange}
        inputs={inputs}
        handleSubmit={handleSubmit}
      />
    );
  }
}

AddCompany.propTypes = {
  dispatchInputError: T.func,
  errors: T.object,
  handleInputChange: T.func,
  inputs: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Companies
   */
  errors: makeCompanyErrors('importUrl'),
  inputs: makeCompanyInputs('importUrl'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Companies
     */
    dispatchInputError: payload => dispatch(inputError(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCompany);
