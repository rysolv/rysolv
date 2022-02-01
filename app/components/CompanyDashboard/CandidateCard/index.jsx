/* eslint-disable no-shadow, react/no-array-index-key */
import React, { useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import CandidateMatchModal from 'components/CandidateMatchModal';
import iconDictionary from 'utils/iconDictionary';

import {
  CandidateCardButton,
  CandidateCardContainer,
  CandidateCardContent,
  CandidateCardDataCell,
  CandidateCardRow,
  CandidateCardRows,
  CandidateCardUserInfo,
  CircleGroup,
  Data,
  Divider,
  ImageGroup,
  NameWrapper,
  PositionWrapper,
  ProfilePicWrapper,
  StyledCircle,
  StyledIconButton,
  StyledLanguageWrapper,
  Title,
} from './styledComponents';

const AddIcon = iconDictionary('add');
const SaveIcon = iconDictionary('bookmarkBorder');
const UnsaveIcon = iconDictionary('bookmark');

const CandidateCard = ({
  deviceView,
  dispatchOpenModal,
  dispatchSaveCandidate,
  handleNav,
  id,
  isLast,
  isSaved,
  lastPosition,
  location,
  matchCriteria,
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const isMobileOrTablet =
    deviceView === 'tablet' ||
    deviceView === 'mobile' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileXXS';

  const sortedCriteria = Object.entries(matchCriteria)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

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
          <CircleGroup>
            <StyledCircle
              isMobileOrTablet={isMobileOrTablet}
              onBlur={() => setIsModalOpen(false)}
              onFocus={() => setIsModalOpen(true)}
              onMouseEnter={() => setIsModalOpen(true)}
              onMouseLeave={() => setIsModalOpen(false)}
              onMouseOut={() => setIsModalOpen(false)}
              onMouseOver={() => setIsModalOpen(true)}
              percentage={percentMatch}
            />
            <ConditionalRender
              Component={
                <CandidateMatchModal
                  matchCriteria={sortedCriteria}
                  percentMatch={percentMatch}
                />
              }
              shouldRender={!isMobileOrTablet && isModalOpen}
            />
          </CircleGroup>
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
  deviceView: T.string.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  handleNav: T.func.isRequired,
  id: T.string.isRequired,
  isLast: T.bool.isRequired,
  isSaved: T.bool.isRequired,
  lastPosition: T.string,
  location: T.string.isRequired,
  matchCriteria: T.object.isRequired,
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
