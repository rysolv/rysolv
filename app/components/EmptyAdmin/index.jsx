import React from 'react';
import T from 'prop-types';

const EmptyAdmin = ({ component }) => (
  <div>Hello</div>
);

EmptyAdmin.propTypes = {
  component: T.string,
}

export default EmptyAdmin;
