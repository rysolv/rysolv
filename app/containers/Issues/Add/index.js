import React, { Fragment } from 'react';
import T from 'prop-types';
import { BackNav } from 'components/base_ui';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import { makeSelectActiveUser } from 'containers/Auth/selectors';

import { incrementStep, clearForm } from '../actions';
import {
  makeSelectIssues,
  makeSelectIssuesLoading,
  makeSelectIssuesStep,
} from '../selectors';
import { addIssueDictionary } from '../stepDictionary';
import { AddWrapper } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class AddIssue extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    const { handleIncrementStep } = this.props;
    handleIncrementStep({ step: 1, view: 'addIssue' });
  }

  componentWillUnmount() {
    const { dispatchClearForm } = this.props;
    dispatchClearForm();
  }

  render() {
    const { activeUser, data, handleNav, loading, step } = this.props;
    const StepToRender = addIssueDictionary[step];
    return (
      <Fragment>
        <BackNav
          label="Back to Issues"
          handleNav={handleNav}
          path="/admin/issues"
        />
        <AddWrapper>
          <AsyncRender
            asyncData={{ data }}
            component={StepToRender}
            loading={loading}
            propsToPassDown={{ activeUser, handleNav }}
          />
        </AddWrapper>
      </Fragment>
    );
  }
}

AddIssue.propTypes = {
  activeUser: T.object,
  data: T.object,
  dispatchClearForm: T.func,
  handleIncrementStep: T.func,
  handleNav: T.func,
  loading: T.bool.isRequired,
  step: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  activeUser: makeSelectActiveUser('activeUser'),
  data: makeSelectIssues('data'),
  loading: makeSelectIssuesLoading('addIssue'),
  step: makeSelectIssuesStep('addIssue'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchClearForm: () => dispatch(clearForm()),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleNav: route => dispatch(push(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddIssue);
