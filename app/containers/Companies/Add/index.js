import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import AsyncRender from 'components/AsyncRender';

import { incrementStep } from '../actions';
import {
  makeSelectCompanies,
  makeSelectCompaniesLoading,
  makeSelectCompaniesStep,
} from '../selectors';
import { addCompanyDictionary } from '../stepDictionary';
import { AddWrapper } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class AddCompany extends React.PureComponent {
    componentDidMount() {
    const { handleIncrementStep } = this.props;
    handleIncrementStep({ step: 1, view: 'addCompany' });
  }

  render() {
    const { data, loading, step } = this.props;

    const StepToRender = addCompanyDictionary[step];
    return (
      <AddWrapper>
        <AsyncRender
          asyncData={{ data }}
          component={StepToRender}
          loading={loading}
        />
      </AddWrapper>
    );
  }
}

AddCompany.propTypes = {
  data: T.object,
  incrementStep: T.func,
  loading: T.bool.isRequired,
  step: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Companies
   */
  data: makeSelectCompanies('data'),
  loading: makeSelectCompaniesLoading('addCompany'),
  step: makeSelectCompaniesStep('addCompany'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Companies
     */
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCompany);
