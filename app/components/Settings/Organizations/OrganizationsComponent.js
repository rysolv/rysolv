import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { IconButton } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  IconButtonWrapper,
  ImageWrapper,
  OrganizationContent,
  OrganizationContentInfo,
  OrganizationDetail,
  OrganizationFundedAmount,
  OrganizationFundedWrapper,
  OrganizationIssues,
  OrganizationListItem,
  OrganizationModifiedDate,
  OrganizationName,
  OrganizationsList,
  StyledImage,
} from './styledComponents';

const EditIcon = iconDictionary('edit');

const OrganizationsComponent = ({ handleNav, organizations }) => (
  <OrganizationsList>
    {organizations.map(
      ({ id, issues, logo, modifiedDate, name, totalFunded }) => (
        <OrganizationListItem key={`list-item-${id}`}>
          <IconButtonWrapper>
            <IconButton
              icon={EditIcon}
              label="Edit"
              onClick={() => handleNav(`/organizations/detail/${id}`)}
            />
          </IconButtonWrapper>
          <OrganizationContent>
            <ImageWrapper>
              <StyledImage alt="Organization Image" src={logo} />
            </ImageWrapper>
            <OrganizationContentInfo>
              <OrganizationModifiedDate>
                {moment.utc(modifiedDate).fromNow()}
              </OrganizationModifiedDate>
              <OrganizationDetail>
                <OrganizationName
                  onClick={() => handleNav(`/organizations/detail/${id}`)}
                >
                  {name}
                </OrganizationName>
                <OrganizationFundedWrapper>
                  <OrganizationIssues>
                    {issues.length} Issues
                  </OrganizationIssues>
                  <OrganizationFundedAmount open>
                    {formatDollarAmount(totalFunded)}
                  </OrganizationFundedAmount>
                </OrganizationFundedWrapper>
              </OrganizationDetail>
            </OrganizationContentInfo>
          </OrganizationContent>
        </OrganizationListItem>
      ),
    )}
  </OrganizationsList>
);

OrganizationsComponent.propTypes = {
  handleNav: T.func,
  organizations: T.array,
};

export default OrganizationsComponent;
