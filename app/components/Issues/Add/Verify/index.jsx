import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import { NameWrapper, StyledBodyCard, StyledLink } from './styledComponents';

const VerifyForm = ({ issueData: { issueBody, issueName, issueUrl } }) => (
  <Fragment>
    <NameWrapper>{issueName.value}</NameWrapper>
    <StyledLink>{issueUrl.value}</StyledLink>
    <ConditionalRender
      Component={() => <StyledBodyCard body={issueBody.value} />}
      shouldRender={!!issueBody.value}
    />
  </Fragment>
);

VerifyForm.propTypes = { issueData: T.object.isRequired };

export default VerifyForm;
