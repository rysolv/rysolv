import React from 'react';
import T from 'prop-types';

import { formatDollarAmount } from 'utils/globalHelpers';

import {
  ContainerTitle,
  IssueAmount,
  IssueContent,
  IssueImage,
  IssueName,
  IssueTitle,
  IssueTitleWrapper,
  RecentlyFundedContainer,
  StyledPrimaryButton,
} from './styledComponents';

const issuesData = [
  {
    amount: 20,
    image: 'https://cdn.worldvectorlogo.com/logos/flutter-logo.svg',
    name: 'Flutter',
    title:
      'Date Picker text field shows errors when switching back from Calendar mode',
  },
  {
    amount: 5,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/OBS.svg/1200px-OBS.svg.png',
    name: 'OBS',
    title: '[Bug]: Scene Collections with "/" in their name cannot be imported',
  },
];

const RecentlyFundedModal = ({ handleNav }) => (
  <RecentlyFundedContainer>
    <ContainerTitle>Recently funded issues</ContainerTitle>
    {issuesData.map(({ amount, image, name, title }, index) => {
      if (index < 3) {
        return (
          <IssueContent>
            <IssueImage src={image} />
            <IssueTitleWrapper>
              <IssueTitle>{title}</IssueTitle>
              <IssueName>{name}</IssueName>
            </IssueTitleWrapper>
            <IssueAmount>{formatDollarAmount(amount)}</IssueAmount>
          </IssueContent>
        );
      }
      return null;
    })}
    <StyledPrimaryButton
      label="Browse Issues"
      onClick={() => handleNav('admin/issues')}
    />
  </RecentlyFundedContainer>
);

RecentlyFundedModal.propTypes = {
  handleNav: T.func.isRequired,
};

export default RecentlyFundedModal;
