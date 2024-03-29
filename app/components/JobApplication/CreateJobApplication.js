import React, { useEffect } from 'react';
import T from 'prop-types';

import { JobsContainer } from './styledComponents';
import viewDictionary from './viewDictionary';

const CreateJobApplication = ({ view, ...restProps }) => {
  useEffect(() => {
    document.title = 'Start Job Application';
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const ViewToRender = viewDictionary[view];

  return (
    <JobsContainer>
      <ViewToRender {...restProps} />
    </JobsContainer>
  );
};

CreateJobApplication.propTypes = { view: T.number.isRequired };

export default CreateJobApplication;
