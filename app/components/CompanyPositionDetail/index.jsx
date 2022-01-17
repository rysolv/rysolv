import React from 'react';
import T from 'prop-types';

import {
  ContentLabel,
  ContentLabelWrapper,
  HorizontalDivider,
  PositionDetailContainer,
  PositionDetailContent,
  PositionDetailHeader,
} from './styledComponents';

const CompanyPositionDetail = ({ company, position }) => {
  const { name } = company;
  const { title } = position;

  return (
    <PositionDetailContainer>
      <PositionDetailHeader>
        {name} - {title}
      </PositionDetailHeader>
      <PositionDetailContent $isFirst>
        <ContentLabelWrapper>
          <ContentLabel>Company</ContentLabel>
        </ContentLabelWrapper>
        <HorizontalDivider />
      </PositionDetailContent>
      <PositionDetailContent>
        <ContentLabelWrapper>
          <ContentLabel>Position</ContentLabel>
        </ContentLabelWrapper>
        <HorizontalDivider />
      </PositionDetailContent>
      <PositionDetailContent>
        <ContentLabelWrapper>
          <ContentLabel>Position Description</ContentLabel>
        </ContentLabelWrapper>
        <HorizontalDivider />
      </PositionDetailContent>
    </PositionDetailContainer>
  );
};

CompanyPositionDetail.propTypes = {
  company: T.object.isRequired,
  position: T.object.isRequired,
};

export default CompanyPositionDetail;
