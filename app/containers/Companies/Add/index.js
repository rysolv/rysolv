import React, { Fragment } from 'react';
import T from 'prop-types';
import { BackNav } from 'components/base_ui';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';

import { incrementStep, clearForm } from '../actions';
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

  componentWillUnmount() {
    const { dispatchClearForm } = this.props;
    dispatchClearForm();
  }

  render() {
    const { data, loading, step, handleNav } = this.props;

    const StepToRender = addCompanyDictionary[step];
    return (
      <Fragment>
        <BackNav
          label="Back to Organizations"
          handleNav={handleNav}
          path="/admin/companies"
        />
        <AddWrapper>
          <AsyncRender
            asyncData={{ data }}
            component={StepToRender}
            loading={loading}
          />
        </AddWrapper>
      </Fragment>
    );
  }
}

AddCompany.propTypes = {
  data: T.object,
  dispatchClearForm: T.func,
  handleIncrementStep: T.func,
  handleNav: T.func,
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
    dispatchClearForm: () => dispatch(clearForm()),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleNav: route => dispatch(push(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCompany);
