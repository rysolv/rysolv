import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import {
  CandidateCardContent,
  CandidateCardDataCell,
  CandidateCardRow,
  CandidateCardRows,
  CandidateCardUserInfo,
  Data,
  Divider,
  ImageGroup,
  NameWrapper,
  PositionWrapper,
  ProfilePicWrapper,
  Title,
} from '../styledComponents';
import {
  WebsiteLink,
  WebsiteWrapper,
  StyledCandidateCardContainer,
} from './styledComponents';

const CompanyCard = ({ company }) => {
  const { companyUrl, description, location, logo, name, size } = company;

  return (
    <StyledCandidateCardContainer>
      <CandidateCardContent>
        <ConditionalRender
          Component={
            <ImageGroup>
              <ProfilePicWrapper src={logo} />
            </ImageGroup>
          }
          shouldRender={!!logo}
        />
        <CandidateCardUserInfo>
          <NameWrapper>{name}</NameWrapper>
          <PositionWrapper>{description}</PositionWrapper>
          <WebsiteWrapper>
            <WebsiteLink href={companyUrl} target="_blank">
              https://www.kumanukumanukumanukumanukumanukumanu.com
            </WebsiteLink>
          </WebsiteWrapper>
        </CandidateCardUserInfo>
        <Divider />
        <CandidateCardRows>
          <CandidateCardRow>
            <CandidateCardDataCell>
              <Title>Location</Title>
              <Data>{location}</Data>
            </CandidateCardDataCell>
          </CandidateCardRow>
          <CandidateCardRow>
            <CandidateCardDataCell>
              <Title>Size</Title>
              <Data>{size}</Data>
            </CandidateCardDataCell>
          </CandidateCardRow>
        </CandidateCardRows>
      </CandidateCardContent>
    </StyledCandidateCardContainer>
  );
};

CompanyCard.propTypes = { company: T.object.isRequired };

export default CompanyCard;
