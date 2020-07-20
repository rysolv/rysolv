/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import {
  DataWrapper,
  HeaderWrapper,
  LogoContainer,
  OrganizationNameWrapper,
  SelectedOrganization,
  StyledLink,
  ValueWrapper,
  VerifyWrapper,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyForm extends React.PureComponent {
  render() {
    const {
      organizationData: {
        organizationDescription,
        organizationLogo,
        organizationName,
        organizationRepo,
        organizationUrl,
      },
    } = this.props;

    return (
      <DataWrapper>
        <VerifyWrapper>
          <HeaderWrapper>
            <LogoContainer
              src={organizationLogo.value}
              alt={organizationName.value}
            />
            <OrganizationNameWrapper>
              <SelectedOrganization>
                {organizationName.value}
              </SelectedOrganization>
              <StyledLink href={organizationRepo.value} target="_blank">
                {organizationRepo.value}
              </StyledLink>
              <StyledLink href={organizationUrl.value} target="_blank">
                {organizationUrl.value}
              </StyledLink>
            </OrganizationNameWrapper>
          </HeaderWrapper>
          <ValueWrapper>{organizationDescription.value}</ValueWrapper>
        </VerifyWrapper>
      </DataWrapper>
    );
  }
}

VerifyForm.propTypes = { organizationData: T.object };

export default VerifyForm;
