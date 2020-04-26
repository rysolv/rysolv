import React, { Fragment } from 'react';
import T from 'prop-types';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { issueTypeDictionary } from './helpers';
import reducer from './reducer';
import saga from './saga';

// eslint-disable-next-line react/prefer-stateless-function
export class Issues extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Admin: Issues';
  }

  render() {
    const { view, match } = this.props;
    const Component = issueTypeDictionary[view];
    return (
      <Fragment>
        <Component match={match} />
      </Fragment>
    );
  }
}

Issues.defaultProps = { view: 'overview' };

Issues.propTypes = {
  match: T.object,
  view: T.string,
};

const withReducer = injectReducer({ key: 'issues', reducer });
const withSaga = injectSaga({ key: 'issues', saga });

export default compose(
  withReducer,
  withSaga,
)(Issues);
