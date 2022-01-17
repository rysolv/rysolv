import React from 'react';
import T from 'prop-types';

import {
  PositionDetailContainer,
  PositionDetailHeader,
} from './styledComponents';

const CompanyPositionDetail = ({ position }) => {
  const { companyName, positionTitle } = position;

  return (
    <PositionDetailContainer>
      <PositionDetailHeader>
        {companyName} - {positionTitle}
      </PositionDetailHeader>
    </PositionDetailContainer>
  );
};

CompanyPositionDetail.propTypes = { position: T.object.isRequired };

export default CompanyPositionDetail;
