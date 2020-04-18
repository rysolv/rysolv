import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender, Verified } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import CompanyDetailTabs from './CompanyDetailTabs';
import TopLanguagesView from './TopLanguagesView';
import RecentActivityView from './RecentActivityView';
import {
  ContentWrapper,
  Description,
  Divider,
  CompanyUrl,
  DetailViewContainer,
  Image,
  MainTabs,
  Name,
  NameWrapper,
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
    issueName: 'react-native-community/react-native-camera# 2786',
    user: 'ceefour',
    userImage: 'https://rysolv.s3.us-east-2.amazonaws.com/tylerprofile.png',
  },
  {
    fundAmount: '2',
    fundDate: '03/15/2017',
    issueName: 'react-native-community/react-native-camera# 959',
    user: 'sibelius',
    userImage: 'https://rysolv.s3.us-east-2.amazonaws.com/paulprofile.png',
  },
];

export class CompanyDetailView extends React.PureComponent {
  render() {
    const {
      data: {
        companyUrl,
        contributors,
        description,
        issues,
        languages,
        logo,
        name,
        repoUrl,
        verified,
      },
      filterValues,
      handleInputChange,
      handleNav,
    } = this.props;
    return (
      <Fragment>
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
              <CompanyUrl href={companyUrl} target="_blank">
                <StyledIcon>{LinkIcon}</StyledIcon>
                {companyUrl}
              </CompanyUrl>
              <RepoUrl href={repoUrl} target="_blank">
                <StyledIcon>{LinkIcon}</StyledIcon>
                {repoUrl}
              </RepoUrl>
            </UrlWrapper>
          </ContentWrapper>
        </DetailViewContainer>
        <TabsContainer>
          <MainTabs>
            <CompanyDetailTabs
              contributors={contributors}
              filterValues={filterValues}
              handleInputChange={handleInputChange}
              handleNav={handleNav}
              issues={issues}
            />
          </MainTabs>
          <SidebarTabs>
            <TopLanguagesView languages={languages} />
            <Divider />
            <RecentActivityView fundData={fundData} />
          </SidebarTabs>
        </TabsContainer>
      </Fragment>
    );
  }
}

CompanyDetailView.propTypes = {
  data: T.object,
  filterValues: T.object.isRequired,
  handleInputChange: T.func,
  handleNav: T.func,
};

export default CompanyDetailView;
