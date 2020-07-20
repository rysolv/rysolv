import React from 'react';
import T from 'prop-types';

import { Container } from './styledComponents';

const BaseContainer = ({ children }) => <Container>{children}</Container>;

BaseContainer.propTypes = {
  children: T.node,
};
export default BaseContainer;
