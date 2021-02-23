import React, { Fragment } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  ContentWrapper,
  DescriptionWrapper,
  LogoWrapper,
  RepoName,
  RepoNameWrapper,
  StyledIcon,
  StyledLink,
} from './styledComponents';

const CodeIcon = iconDictionary('code');
const LinkIcon = iconDictionary('link');

export class VerifyForm extends React.PureComponent {
  render() {
    const {
      repoData: {
        organizationUrl,
        repoDescription,
        repoLogo,
        repoName,
        repoUrl,
      },
    } = this.props;
    return (
      <Fragment>
        <ContentWrapper>
          <LogoWrapper alt={repoName.value} src={repoLogo.value} />
          <RepoNameWrapper>
            <RepoName>{repoName.value}</RepoName>
            <ContentWrapper>
              <StyledLink
                hasValue={!!repoUrl.value}
                href={repoUrl.value}
                target="_blank"
              >
                <StyledIcon>{CodeIcon}</StyledIcon>
                {repoUrl.value}
              </StyledLink>
              <StyledLink
                hasValue={!!organizationUrl.value}
                href={organizationUrl.value}
                target="_blank"
              >
                <StyledIcon>{LinkIcon}</StyledIcon>
                {organizationUrl.value}
              </StyledLink>
            </ContentWrapper>
          </RepoNameWrapper>
        </ContentWrapper>
        <DescriptionWrapper hasValue={!!repoDescription.value}>
          {repoDescription.value}
        </DescriptionWrapper>
      </Fragment>
    );
  }
}

VerifyForm.propTypes = { repoData: T.object.isRequired };

export default VerifyForm;
