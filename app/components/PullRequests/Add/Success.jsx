import React from 'react';
import T from 'prop-types';

import { VerifyForm } from './styledComponents';

const ImportSuccess = ({ dispatchClearForm }) => (
  <VerifyForm>
    <h2 style={{ color: 'green' }}>Creation Success!</h2>
    <p>
      Rysolv will keep track of this pull request and automatically credit your
      account when this pull request is merged in.
    </p>
    <button type="button" onClick={() => dispatchClearForm({ step: 1 })}>
      do it again!
    </button>
  </VerifyForm>
);

ImportSuccess.propTypes = {
  dispatchClearForm: T.func,
};

export default ImportSuccess;
