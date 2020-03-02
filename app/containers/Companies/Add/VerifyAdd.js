import React from 'react';
import T from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyAdd extends React.PureComponent {
  componentWillUnmount() {
    const { handleIncrementStep } = this.props;
    handleIncrementStep({ step: 1 });
  }

  render() {
    return <div>Verify Add</div>;
  }
}

VerifyAdd.propTypes = {
  handleIncrementStep: T.func,
};

export default VerifyAdd;
