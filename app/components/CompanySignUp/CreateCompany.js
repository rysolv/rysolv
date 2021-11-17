import React, { useEffect } from 'react';
import T from 'prop-types';

import { CompanySignUpContainer } from './styledComponents';
import viewDictionary from './viewDictionary';

const CreateCompany = ({ view, ...restProps }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Company Sign Up';
  }, []);

  const ViewToRender = viewDictionary[view];

  return (
    <CompanySignUpContainer>
      <ViewToRender {...restProps} />
    </CompanySignUpContainer>
  );
};

CreateCompany.propTypes = { view: T.number.isRequired };

export default CreateCompany;
