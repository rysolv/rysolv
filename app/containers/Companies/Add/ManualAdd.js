import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import AddCompanyForm from 'components/Companies/AddCompanyView/AddCompanyForm';

import { inputChange } from '../actions';
import { makeSelectCompanies } from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class ManualAdd extends React.PureComponent {
  componentWillUnmount() {
    const { handleIncrementStep } = this.props;
    handleIncrementStep({ step: 1 });
  }

  render() {
    const { data, handleInputChange } = this.props;
    return <AddCompanyForm data={data} handleInputChange={handleInputChange} />;
  }
}

ManualAdd.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
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
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualAdd);
