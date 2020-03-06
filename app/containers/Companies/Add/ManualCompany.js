import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton, SecondaryButton } from 'components/base_ui';
import ManualForm from 'components/Companies/Add/ManualForm';

import { incrementStep, inputChange } from '../actions';
import { makeSelectCompanies, makeSelectCompaniesDisabled } from '../selectors';
import { ButtonGroup, StyledH3 } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class ManualCompany extends React.PureComponent {
  render() {
    const {
      data,
      handleIncrementStep,
      handleInputChange,
      isDisabled,
    } = this.props;
    return (
      <Fragment>
        <StyledH3>Add Company</StyledH3>
        <ManualForm data={data} handleInputChange={handleInputChange} />
        <ButtonGroup>
          <SecondaryButton
            label="Back"
            onClick={() => handleIncrementStep({ step: 1, view: 'addCompany' })}
          />
          <PrimaryButton
            disabled={isDisabled}
            label="Next"
            onClick={() => handleIncrementStep({ step: 3, view: 'addCompany' })}
          />
        </ButtonGroup>
      </Fragment>
    );
  }
}

ManualCompany.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
  isDisabled: T.bool,
  handleInputChange: T.func,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Companies
   */
  data: makeSelectCompanies('data'),
  isDisabled: makeSelectCompaniesDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Companies
     */
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualCompany);
