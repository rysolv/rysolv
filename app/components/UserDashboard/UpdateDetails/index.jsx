import React, { Fragment } from 'react';
import T from 'prop-types';

// import {
//   AddSkillButton,
//   ProfileDetailContainer,
//   ProfileDetailItem,
//   ProfilePicture,
//   SkillsContainer,
//   StyledPrimaryButton,
// } from './styledComponents';

const UpdateDetails = ({ data }) => {
  console.log('rendered');

  return <Fragment>Update Details</Fragment>;
};

UpdateDetails.propTypes = {
  data: T.object.isRequired,
};

export default UpdateDetails;
