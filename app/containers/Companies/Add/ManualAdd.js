import React from 'react';
import T from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export class ManualAdd extends React.PureComponent {
  componentWillUnmount() {
    const { handleIncrementStep } = this.props;
    handleIncrementStep({ step: 1 });
  }

  render() {
    return <div>Manual Add</div>;
  }
}

ManualAdd.propTypes = {
  handleIncrementStep: T.func,
};

export default ManualAdd;
