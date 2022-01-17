/* eslint-disable no-shadow, react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import { Circle } from 'components/base_ui';
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
  ImageGroup,
  NameWrapper,
  PositionWrapper,
  ProfilePicWrapper,
  StyledIconButton,
  StyledLanguageWrapper,
  Title,
} from './styledComponents';

const AddIcon = iconDictionary('add');
const SaveIcon = iconDictionary('bookmarkBorder');
const UnsaveIcon = iconDictionary('bookmark');

const CandidateCard = ({
  dispatchOpenModal,
  dispatchSaveCandidate,
  handleNav,
  id,
  isLast,
  isSaved,
  lastPosition,
  location,
  name,
  percentMatch,
  preferredLanguages,
  profilePic,
  salary,
  selectedPosition,
  threadId,
  type,
  yearsOfExperience,
}) => {
  const ButtonText = threadId ? `View Messages` : `Connect`;
  const CardIcon = isSaved ? UnsaveIcon : SaveIcon;
  const CardLabel = isSaved ? 'Unshortlist' : 'Shortlist';

  const handleClick = () => {
    if (threadId) {
      handleNav(`/messages/${threadId}`);
    } else {
      dispatchOpenModal({ tableData });
    }
  };

  const tableData = { positionId: selectedPosition, userId: id };

  return (
    <CandidateCardContainer isLast={isLast} isSaved={isSaved}>
      <StyledIconButton
        icon={CardIcon}
        isSaved={isSaved}
        label={CardLabel}
        onClick={() =>
          dispatchSaveCandidate({
            candidateId: id,
            positionId: selectedPosition,
          })
        }
      />
      <CandidateCardContent>
        <ImageGroup>
          <ProfilePicWrapper src={profilePic} />
          <Circle percentage={percentMatch} />
        </ImageGroup>
        <CandidateCardUserInfo>
          <NameWrapper>{name}</NameWrapper>
          <PositionWrapper>{lastPosition}</PositionWrapper>
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
            <CandidateCardDataCell>
              <Title>Experience</Title>
              <Data>{yearsOfExperience}</Data>
            </CandidateCardDataCell>
            <CandidateCardDataCell>
              <Title>Salary</Title>
              <Data>{salary}</Data>
            </CandidateCardDataCell>
          </CandidateCardRow>
          <CandidateCardRow>
            <CandidateCardDataCell>
              <Title>Location</Title>
              <Data>{location}</Data>
            </CandidateCardDataCell>
            <CandidateCardDataCell>
              <Title>Type</Title>
              <Data>{type}</Data>
            </CandidateCardDataCell>
          </CandidateCardRow>
        </CandidateCardRows>
      </CandidateCardContent>
      <CandidateCardButton onClick={handleClick}>
        {AddIcon} {ButtonText}
      </CandidateCardButton>
    </CandidateCardContainer>
  );
};

CandidateCard.defaultProps = { lastPosition: '' };

CandidateCard.propTypes = {
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  handleNav: T.func.isRequired,
  id: T.string.isRequired,
  isLast: T.bool.isRequired,
  isSaved: T.bool.isRequired,
  lastPosition: T.string,
  location: T.string.isRequired,
  name: T.string.isRequired,
  percentMatch: T.number.isRequired,
  preferredLanguages: T.array.isRequired,
  profilePic: T.string.isRequired,
  salary: T.string.isRequired,
  selectedPosition: T.string.isRequired,
  threadId: T.string,
  type: T.string.isRequired,
  yearsOfExperience: T.string.isRequired,
};

export default CandidateCard;
