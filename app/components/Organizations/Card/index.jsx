import React, { Fragment, useEffect, useState } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { FundingWrapper } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  ContentContainer,
  DateWrapper,
  DescriptionWrapper,
  ImageContainer,
  Issues,
  IssuesIcon,
  IssuesWrapper,
  NameWrapper,
  OrganizationCardItem,
  SettingsContainer,
  StatsWrapper,
  StyledImage,
  StyledListItem,
  StyledOrganizationCard,
  StyledPagination,
  TextContainer,
  TitleContainer,
} from './styledComponents';

const issueIcon = iconDictionary('issue');

const OrganizationCard = ({ data, handleNav }) => {
  const perPage = 5;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  console.log(data.length);
  console.log('offset', offset);
  console.log('currentPage', currentPage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [offset, currentPage]);

  const handlePageChange = value => {
    console.log('selected', value);
    setCurrentPage(value);
    setOffset(value * perPage);
  };
  const slice = data.slice(offset, offset + perPage);

  return (
    <Fragment>
      <StyledOrganizationCard>
        {slice.map(
          ({
            description,
            id,
            issues,
            logo,
            modifiedDate,
            name,
            totalFunded,
          }) => (
            <StyledListItem key={id}>
              <TitleContainer>
                <NameWrapper
                  onClick={() => handleNav(`/organizations/detail/${id}`)}
                >
                  {name}
                </NameWrapper>
                <SettingsContainer>
                  <DateWrapper>
                    Last post {moment(modifiedDate).format('M/D/YYYY')}
                  </DateWrapper>
                </SettingsContainer>
              </TitleContainer>
              <ContentContainer>
                <ImageContainer>
                  <StyledImage alt="Organization Image" src={logo} />
                </ImageContainer>
                <TextContainer>
                  <DescriptionWrapper>{description}</DescriptionWrapper>
                  <StatsWrapper>
                    <OrganizationCardItem>
                      <IssuesWrapper>
                        <IssuesIcon>{issueIcon}</IssuesIcon>
                        <Issues>
                          {issues.length}{' '}
                          {issues.length === 1 ? `Issue` : `Issues`}
                        </Issues>
                      </IssuesWrapper>
                    </OrganizationCardItem>
                    <OrganizationCardItem>
                      <FundingWrapper
                        medium
                        open
                        value={formatDollarAmount(totalFunded)}
                      />
                    </OrganizationCardItem>
                  </StatsWrapper>
                </TextContainer>
              </ContentContainer>
            </StyledListItem>
          ),
        )}
        <StyledPagination
          count={perPage}
          shape="rounded"
          onChange={(e, value) => handlePageChange(value)}
        />
      </StyledOrganizationCard>
    </Fragment>
  );
};

OrganizationCard.propTypes = {
  data: T.array,
  handleNav: T.func,
};

export default OrganizationCard;
