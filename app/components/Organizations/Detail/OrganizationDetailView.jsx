import React from 'react';
import T from 'prop-types';

import { ConditionalRender, Verified, BackNav } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import OrganizationDetailTabs from './OrganizationDetailTabs';
import TopLanguagesView from './TopLanguagesView';
import RecentActivityView from './RecentActivityView';
import {
  ContentWrapper,
  Description,
  DetailContainer,
  DetailViewContainer,
  Divider,
  Image,
  MainTabs,
  Name,
  NameWrapper,
  OrganizationUrl,
  RepoUrl,
  SidebarTabs,
  StyledIcon,
  TabsContainer,
  UrlWrapper,
  VerifiedWrapper,
} from './styledComponents';

const LinkIcon = iconDictionary('link');

const VerifiedComponent = (
  <VerifiedWrapper>
    <Verified />
    Verified
  </VerifiedWrapper>
);

const fundData = [
  {
    fundAmount: '10',
    fundDate: '10/12/2018',
    id: 'c234823ndhfudsf',
    issueName: 'react-native-community/react-native-camera# 2786',
    user: 'ceefour',
    userImage: 'https://rysolv.s3.us-east-2.amazonaws.com/tylerprofile.png',
  },
  {
    fundAmount: '2',
    fundDate: '03/15/2017',
    id: 'sdfb23i8budsf',
    issueName: 'react-native-community/react-native-camera# 959',
    user: 'sibelius',
    userImage: 'https://rysolv.s3.us-east-2.amazonaws.com/paulprofile.png',
  },
];

export class OrganizationDetailView extends React.PureComponent {
  render() {
    const {
      data: {
        contributors,
        description,
        issues,
        logo,
        name,
        organizationUrl,
        preferredLanguages,
        repoUrl,
        verified,
      },
      filterValues,
      handleInputChange,
      handleNav,
      handleUpvote,
    } = this.props;
    return (
      <DetailContainer>
        <BackNav
          label="Back to Organizations"
          handleNav={handleNav}
          path="/organizations"
        />

        <DetailViewContainer>
          <Image src={logo} />
          <ContentWrapper>
            <NameWrapper>
              <Name>{name}</Name>
              <ConditionalRender
                Component={VerifiedComponent}
                shouldRender={verified}
              />
            </NameWrapper>
            <Description>{description}</Description>
            <UrlWrapper>
              <OrganizationUrl href={organizationUrl} target="_blank">
                <StyledIcon>{LinkIcon}</StyledIcon>
                {organizationUrl}
              </OrganizationUrl>
              <RepoUrl href={repoUrl} target="_blank">
                <StyledIcon>{LinkIcon}</StyledIcon>
                {repoUrl}
              </RepoUrl>
            </UrlWrapper>
          </ContentWrapper>
        </DetailViewContainer>
        <TabsContainer>
          <MainTabs>
            <OrganizationDetailTabs
              contributors={contributors}
              filterValues={filterValues}
              handleInputChange={handleInputChange}
              handleNav={handleNav}
              handleUpvote={handleUpvote}
              issues={issues}
            />
          </MainTabs>
          <SidebarTabs>
            <TopLanguagesView preferredLanguages={preferredLanguages} />
            <Divider />
            <RecentActivityView fundData={fundData} handleNav={handleNav} />
          </SidebarTabs>
        </TabsContainer>
      </DetailContainer>
    );
  }
}

OrganizationDetailView.propTypes = {
  data: T.object,
  filterValues: T.object.isRequired,
  handleInputChange: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
};

export default OrganizationDetailView;
