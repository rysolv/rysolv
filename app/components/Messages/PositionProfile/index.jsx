/* eslint-disable no-shadow, react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  CandidateCardButton,
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

const PositionIcon = iconDictionary('workOutline');

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

  const handleClick = () => {
    handleNav(`/jobs/${positionId}`);
  };

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
      <CandidateCardButton onClick={handleClick}>
        {PositionIcon} Position Detail
      </CandidateCardButton>
    </CandidateCardContainer>
  );
};

PositionCard.propTypes = {
  handleNav: T.func.isRequired,
  position: T.object.isRequired,
};

export default PositionCard;
