/* eslint-disable no-shadow, react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import {
  CandidateCardContainer,
  CandidateCardContent,
  CandidateCardDataCell,
  CandidateCardRow,
  CandidateCardRows,
  CandidateCardUserInfo,
  Data,
  Divider,
  NameWrapper,
  PositionWrapper,
  StyledLanguageWrapper,
  Title,
} from '../styledComponents';

const PositionCard = ({ position }) => {
  const {
    description,
    location,
    preferredLanguages,
    role,
    salary,
    title,
    type,
  } = position;

  return (
    <CandidateCardContainer>
      <CandidateCardContent>
        <CandidateCardUserInfo>
          <NameWrapper>{title}</NameWrapper>
          <PositionWrapper>{description}</PositionWrapper>
          {preferredLanguages.map((language, index) => (
            <StyledLanguageWrapper
              key={`${language}-${index}`}
              language={language}
            />
          ))}
        </CandidateCardUserInfo>
        <Divider />
        <CandidateCardRows>
          <CandidateCardRow>
            <CandidateCardDataCell isTop>
              <Title>Location</Title>
              <Data>{location}</Data>
            </CandidateCardDataCell>
            <CandidateCardDataCell>
              <Title>Salary</Title>
              <Data>{salary}</Data>
            </CandidateCardDataCell>
          </CandidateCardRow>
          <CandidateCardRow>
            <CandidateCardDataCell isTop>
              <Title>Role</Title>
              <Data>{role}</Data>
            </CandidateCardDataCell>
            <CandidateCardDataCell>
              <Title>Type</Title>
              <Data>{type}</Data>
            </CandidateCardDataCell>
          </CandidateCardRow>
        </CandidateCardRows>
      </CandidateCardContent>
    </CandidateCardContainer>
  );
};

PositionCard.propTypes = { position: T.object.isRequired };

export default PositionCard;
