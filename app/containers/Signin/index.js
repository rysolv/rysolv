import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// eslint-disable-next-line react/prefer-stateless-function
export class Signin extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Sign in';
  }

  render() {
    return (
      <Fragment>
        <p>Sign in comopnent!</p>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Signin);
