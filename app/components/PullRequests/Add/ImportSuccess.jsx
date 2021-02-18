import React, { useEffect } from 'react';
import T from 'prop-types';

import {
  ButtonGroup,
  StyledFocusDiv,
  StyledHeader,
  StyledLink,
  StyledSecondayButton,
  StyledSuccessContent,
} from './styledComponents';

const ImportSuccess = ({ handleClose }) => {
  useEffect(() => {
    document.getElementById('successPullRequest').focus();
  }, []);
  const handleKeypress = ({ key }) => {
    if (key === 'Enter') {
      handleClose();
    }
  };
  return (
    <StyledFocusDiv
      id="successPullRequest"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <StyledHeader isSuccess>Success!</StyledHeader>
      <StyledSuccessContent>
        Rysolv will keep track of this pull request and automatically credit
        your account when it is merged in.
        <br />
        <br />
        Keep track of pull requests{' '}
        <StyledLink to="/settings/pullrequests">here</StyledLink>.
      </StyledSuccessContent>
      <ButtonGroup>
        <StyledSecondayButton label="Close" onClick={handleClose} />
      </ButtonGroup>
    </StyledFocusDiv>
  );
};

ImportSuccess.propTypes = {
  handleClose: T.func,
};

export default ImportSuccess;
