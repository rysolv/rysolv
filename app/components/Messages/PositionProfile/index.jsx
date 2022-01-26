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

const PositionCard = ({ handleNav, position }) => {
  const {
    description,
    location,
    positionId,
    preferredLanguages,
    role,
    salary,
    title,
    type,
  } = position;

  return (
    <CandidateCardContainer>
      <CandidateCardContent
        isPosition
        onClick={() => handleNav(`/jobs/${positionId}`)}
      >
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

PositionCard.propTypes = {
  handleNav: T.func.isRequired,
  position: T.object.isRequired,
};

export default PositionCard;
