import React, { useEffect } from 'react';
import T from 'prop-types';

import { JobsContainer } from './styledComponents';
import viewDictionary from './viewDictionary';

const Jobs = ({ view, ...restProps }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Jobs';
  }, []);
  const ViewToRender = viewDictionary[view];
  return (
    <JobsContainer>
      <ViewToRender {...restProps} />
    </JobsContainer>
  );
};

Jobs.propTypes = { view: T.number.isRequired };

export default Jobs;
