import React, { useState } from 'react';
import T from 'prop-types';

import {
  BackNav,
  BaseFileInput,
  ConditionalRender,
  Verified,
} from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';
import { getBase64 } from 'utils/globalHelpers';

import OrganizationDetailTabs from './OrganizationDetailTabs';
import TopLanguagesView from './TopLanguagesView';
import RecentActivityView from './RecentActivityView';
import {
  ContentWrapper,
  Description,
  DetailContainer,
  DetailViewContainer,
  Divider,
  EditLogoWrapper,
  HeaderWrapper,
  Image,
  MainTabs,
  Name,
  NameWrapper,
  OrganizationUrl,
  RepoUrl,
  SidebarTabs,
  StyledBaseTextInput,
  StyledErrorSuccessBanner,
  StyledIcon,
  StyledPrimaryButton,
  StyledSecondayButton,
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

const OrganizationDetailView = ({
  activeUser: { organizations },
  alerts: { error, success },
  data: {
    activity,
    contributors,
    description,
    id: organizationId,
    issues,
    logo,
    name,
    organizationUrl,
    preferredLanguages,
    repoUrl,
    verified,
  },
  deviceView,
  dispatchEditOrganization,
  dispatchOpenModal,
  filterValues,
  handleClearAlerts,
  handleInputChange,
  handleNav,
  handleUpvote,
  isSignedIn,
}) => {
  const [displayEditView, setDisplayEditView] = useState(false);
  const [descriptionChange, setDescriptionChange] = useState(description);
  const [logoChange, setLogoChange] = useState(logo);
  const [nameChange, setNameChange] = useState(name);
  const [organizationUrlChange, setOrganizationUrlChange] = useState(
    organizationUrl,
  );
  const [languagesChange, setLanguagesChange] = useState(preferredLanguages);
  const [repoUrlChange, setRepoUrlChange] = useState(repoUrl);

  const handleSave = () => {
    dispatchEditOrganization({
      editRequest: {
        description: descriptionChange,
        logo: logoChange,
        name: nameChange,
        organizationUrl: organizationUrlChange,
        preferredLanguages: languagesChange,
        repoUrl: repoUrlChange,
        verified,
      },
      itemId: organizationId,
    });
  };

  const handleUploadLogo = async e => {
    const { files } = e.target;
    const formattedLogo = await getBase64(files[0]);
    setLogoChange(formattedLogo);
  };

  const isMobileOrTable = deviceView === 'mobile';

  const DetailViewComponent = (
    <DetailViewContainer>
      <Image src={logoChange} />
      <ContentWrapper>
        <HeaderWrapper>
          <NameWrapper>
            <Name>{name}</Name>
            <ConditionalRender
              Component={VerifiedComponent}
              shouldRender={verified}
            />
          </NameWrapper>
          <ConditionalRender
            Component={
              <StyledPrimaryButton
                label="Edit"
                onClick={() => setDisplayEditView(true)}
              />
            }
            shouldRender={
              isSignedIn &&
              !!organizations.find(({ id }) => organizationId === id)
            }
          />
        </HeaderWrapper>
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
  );
  const EditViewComponent = (
    <DetailViewContainer>
      <EditLogoWrapper>
        <Image src={logoChange} />
        <BaseFileInput
          accept="image/png, image/jpeg"
          id="logo-file-input"
          onChange={handleUploadLogo}
        />
      </EditLogoWrapper>
      <ContentWrapper>
        <HeaderWrapper>
          <NameWrapper>
            <StyledBaseTextInput
              onChange={e => setNameChange(e.target.value)}
              value={nameChange}
            />

            <ConditionalRender
              Component={VerifiedComponent}
              shouldRender={verified}
            />
          </NameWrapper>
          <div>
            <StyledSecondayButton
              label="Cancel"
              onClick={() => setDisplayEditView(false)}
            />
            <StyledPrimaryButton label="Save" onClick={() => handleSave()} />
          </div>
        </HeaderWrapper>
        <StyledBaseTextInput
          multiline
          onChange={e => setDescriptionChange(e.target.value)}
          value={descriptionChange}
          width="100%"
        />
        <UrlWrapper>
          <OrganizationUrl width="100%">
            <StyledIcon>{LinkIcon}</StyledIcon>
            <StyledBaseTextInput
              onChange={e => setOrganizationUrlChange(e.target.value)}
              value={organizationUrlChange}
            />
          </OrganizationUrl>

          <RepoUrl width="100%">
            <StyledIcon>{LinkIcon}</StyledIcon>
            <StyledBaseTextInput
              onChange={e => setRepoUrlChange(e.target.value)}
              value={repoUrlChange}
            />
          </RepoUrl>
        </UrlWrapper>
      </ContentWrapper>
    </DetailViewContainer>
  );

  return (
    <DetailContainer>
      <BackNav
        label="Back to Organizations"
        handleNav={handleNav}
        path="/organizations"
      />
      <ConditionalRender
        Component={
          <StyledErrorSuccessBanner
            error={error}
            onClose={handleClearAlerts}
            success={success}
          />
        }
        shouldRender={
          isSignedIn && !!organizations.find(({ id }) => organizationId === id)
        }
      />
      <ConditionalRender
        Component={DetailViewComponent}
        FallbackComponent={EditViewComponent}
        shouldRender={!displayEditView}
      />
      <TabsContainer>
        <MainTabs>
          <OrganizationDetailTabs
            contributors={contributors}
            dispatchOpenModal={dispatchOpenModal}
            filterValues={filterValues}
            handleInputChange={handleInputChange}
            handleNav={handleNav}
            handleUpvote={handleUpvote}
            isSignedIn={isSignedIn}
            issues={issues}
          />
        </MainTabs>
        <SidebarTabs>
          <TopLanguagesView
            displayEditView={displayEditView}
            preferredLanguages={preferredLanguages}
            setLanguagesChange={setLanguagesChange}
          />
          <Divider />
          <RecentActivityView activity={activity} handleNav={handleNav} />
          <Divider shouldHide={!isMobileOrTable} />
        </SidebarTabs>
      </TabsContainer>
    </DetailContainer>
  );
};

OrganizationDetailView.propTypes = {
  activeUser: T.object,
  alerts: T.object.isRequired,
  data: T.object.isRequired,
  deviceView: T.string.isRequired,
  dispatchEditOrganization: T.func.isRequired,
  dispatchOpenModal: T.func,
  filterValues: T.object.isRequired,
  handleClearAlerts: T.func.isRequired,
  handleInputChange: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
};

export default OrganizationDetailView;
