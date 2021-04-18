import React, { useEffect } from 'react';
import T from 'prop-types';

import { RecruitingContainer } from './styledComponents';
import viewDictionary from './viewDictionary';

const Recruiting = ({ view, ...restProps }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Recruiting';
  }, []);
  const ViewToRender = viewDictionary[view];
  return (
    <RecruitingContainer>
      <ViewToRender {...restProps} />
    </RecruitingContainer>
  );
};

Recruiting.propTypes = { view: T.number.isRequired };

export default Recruiting;
