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
  NameWrapper,
  PicWrapper,
  PositionWrapper,
  ProfilePicWrapper,
  StyledIconButton,
  StyledLanguageWrapper,
  Title,
} from './styledComponents';

const AddIcon = iconDictionary('add');
const RemoveIcon = iconDictionary('remove');
const SaveIcon = iconDictionary('bookmarkBorder');
const UnsaveIcon = iconDictionary('bookmark');

const CandidateCard = ({
  dispatchOpenModal,
  dispatchSaveCandidate,
  index,
  isInterviewRequested,
  isSaved,
  languages,
  lastPosition,
  location,
  name,
  percentMatch,
  profilePic,
  salary,
  type,
  yearsOfExperience,
}) => {
  const ButtonIcon = isInterviewRequested ? RemoveIcon : AddIcon;
  const ButtonText = isInterviewRequested
    ? `Cancel Interview`
    : `Schedule Interview`;
  const CardIcon = isSaved ? UnsaveIcon : SaveIcon;
  const CardLabel = isSaved ? 'Unshortlist' : 'Shortlist';

  return (
    <CandidateCardContainer isSaved={isSaved}>
      <StyledIconButton
        icon={CardIcon}
        isSaved={isSaved}
        label={CardLabel}
        onClick={() => dispatchSaveCandidate({ index })}
      />
      <CandidateCardContent>
        <PicWrapper>
          <ProfilePicWrapper src={profilePic} />
          <Circle percentage={percentMatch} />
        </PicWrapper>
        <CandidateCardUserInfo>
          <NameWrapper>{name}</NameWrapper>
          <PositionWrapper>{lastPosition}</PositionWrapper>
          {languages.map(language => (
            <StyledLanguageWrapper language={language} />
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
      <CandidateCardButton onClick={() => dispatchOpenModal()}>
        {ButtonIcon} {ButtonText}
      </CandidateCardButton>
    </CandidateCardContainer>
  );
};

CandidateCard.propTypes = {
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  index: T.number.isRequired,
  isInterviewRequested: T.bool.isRequired,
  isSaved: T.bool.isRequired,
  languages: T.array.isRequired,
  lastPosition: T.string.isRequired,
  location: T.string.isRequired,
  name: T.string.isRequired,
  percentMatch: T.number.isRequired,
  profilePic: T.string.isRequired,
  salary: T.string.isRequired,
  type: T.string.isRequired,
  yearsOfExperience: T.string.isRequired,
};

export default CandidateCard;
