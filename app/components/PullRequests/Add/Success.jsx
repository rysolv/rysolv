import React, { Fragment } from 'react';
import T from 'prop-types';

const ImportSuccess = ({ dispatchClearForm }) => (
  <Fragment>
    <h2 style={{ color: 'green' }}>Creation Success!</h2>
    <p>
      Rysolv will keep track of this pull request and automatically credit your
      account when this pull request is merged in.
    </p>
    <button type="button" onClick={() => dispatchClearForm({ step: 1 })}>
      do it again!
    </button>
  </Fragment>
);

ImportSuccess.propTypes = {
  dispatchClearForm: T.func,
};

export default ImportSuccess;
