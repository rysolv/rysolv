import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { PrimaryButton } from 'components/base_ui';

import {
  ButtonContainer,
  ContentContainer,
  DateWrapper,
  DescriptionWrapper,
  ImageContainer,
  NameWrapper,
  StatsWrapper,
  StyledCompanyCard,
  StyledImage,
  StyledListItem,
  TextContainer,
  TitleContainer,
} from './styledComponents';

const CompanyCard = ({ data, handleFetchInfo, handleNav }) => {
  const handleEdit = ({ companyId }) => {
    handleFetchInfo({ companyId });
    handleNav(`/admin/companies/edit`);
  };

  return (
    <Fragment>
      <StyledCompanyCard>
        {data.map(
          ({
            description,
            icon,
            id,
            issues,
            lastPostDate,
            name,
            pullRequests,
          }) => (
            <StyledListItem key={name}>
              <div>
                <TitleContainer>
                  <NameWrapper>{name}</NameWrapper>
                  <DateWrapper>
                    Last post {moment(lastPostDate, 'MM/DD/YYYY').fromNow()}
                  </DateWrapper>
                </TitleContainer>
                <ContentContainer>
                  <ImageContainer>
                    <StyledImage alt="Company Image" src={icon} />
                  </ImageContainer>
                  <TextContainer>
                    <DescriptionWrapper>{description}</DescriptionWrapper>
                    <StatsWrapper>
                      {issues} Issues • {pullRequests} Pull Requests
                    </StatsWrapper>
                  </TextContainer>
                  <ButtonContainer>
                    <PrimaryButton
                      label="Edit"
                      onClick={() => handleEdit({ companyId: id })}
                    />
                  </ButtonContainer>
                </ContentContainer>
              </div>
            </StyledListItem>
          ),
        )}
      </StyledCompanyCard>
    </Fragment>
  );
};

CompanyCard.propTypes = {
  data: T.array,
  handleFetchInfo: T.func,
  handleNav: T.func,
};

export default CompanyCard;
