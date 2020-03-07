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
import { editCompanyDictionary } from '../stepDictionary';
import { EditWrapper } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class EditCompany extends React.PureComponent {
  componentDidMount() {
    const { handleIncrementStep } = this.props;
    handleIncrementStep({ step: 1, view: 'editCompany' });
  }

  render() {
    const { data, loading, step } = this.props;

    const StepToRender = editCompanyDictionary[step];
    return (
      <EditWrapper>
        <AsyncRender
          asyncData={{ data }}
          component={StepToRender}
          loading={loading}
        />
      </EditWrapper>
    );
  }
}

EditCompany.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
  loading: T.bool.isRequired,
  step: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Companies
   */
  data: makeSelectCompanies('data'),
  loading: makeSelectCompaniesLoading('editCompany'),
  step: makeSelectCompaniesStep('editCompany'),
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
)(EditCompany);
