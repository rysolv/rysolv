import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import {
  BackNav,
  BaseFileInput,
  ConditionalRender,
  ModalDialog,
} from 'components/base_ui';
import { validateOneField } from 'containers/Repos/helpers';
import iconDictionary from 'utils/iconDictionary';
import { getBase64, getPaymentMethod } from 'utils/globalHelpers';

import RecentActivityView from './RecentActivityView';
import RepoDetail from './RepoDetail';
import { PayoutModal, RepoDonations } from './Donations';
import TopLanguagesView from './TopLanguagesView';
import {
  BottomComponentsContainer,
  ButtonGroup,
  ComponentsContainer,
  ContentWrapper,
  Description,
  DetailContainer,
  DetailViewContainer,
  Divider,
  EditLogoWrapper,
  HeaderWrapper,
  Image,
  MainComponents,
  Name,
  NameWrapper,
  OrganizationUrl,
  PayoutButton,
  RepoUrl,
  SidebarComponent,
  StyledBaseTextInput,
  StyledErrorSuccessBanner,
  StyledIcon,
  StyledPrimaryButton,
  StyledSecondayButton,
  StyledVerified,
  SubHeaderWrapper,
  UrlWrapper,
} from './styledComponents';

const GithubIcon = iconDictionary('github');
const LanguageIcon = iconDictionary('language');

const RepoDetailView = ({
  activeUser,
  activeUser: { githubId, repos },
  alerts: { error, success },
  data: {
    activity,
    contributors,
    description,
    earnedBounties,
    githubOwners,
    id: repoId,
    issues,
    logo,
    maintainerProceeds,
    name,
    organizationUrl,
    payoutUrl,
    preferredLanguages,
    repoUrl,
    totalFunded,
    verified,
  },
  deviceView,
  dispatchEditRepo,
  dispatchOpenModal,
  filterValues,
  handleClearAlerts,
  handleInputChange,
  handleNav,
  handleUpvote,
  isSignedIn,
}) => {
  const currentPaymentMethod = getPaymentMethod(payoutUrl);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayEditView, setDisplayEditView] = useState(false);
  const [descriptionChange, setDescriptionChange] = useState(description);
  const [logoChange, setLogoChange] = useState(logo);
  const [nameChange, setNameChange] = useState(name);
  const [organizationUrlChange, setOrganizationUrlChange] = useState(
    organizationUrl,
  );
  const [payoutMethod, setPayoutMethod] = useState(currentPaymentMethod);
  const [payoutUrlChange, setPayoutUrlChange] = useState(payoutUrl);
  const [payoutUrlError, setPayoutUrlError] = useState(false);
  const [repoUrlChange, setRepoUrlChange] = useState(repoUrl);

  const handleClose = () => {
    setIsModalOpen(false);
    setPayoutMethod(currentPaymentMethod);
    setPayoutUrlChange(payoutUrl);
    setPayoutUrlError(false);
  };

  const handleAddPayout = () => {
    const validationError = validateOneField({
      field: 'payoutUrl',
      values: { payoutUrl: payoutUrlChange },
      verifyField: { payoutMethod },
    });
    setPayoutUrlError(validationError);
    if (!validationError && !validationError) {
      dispatchEditRepo({
        editRequest: {
          description: descriptionChange,
          logo: logoChange,
          name: nameChange,
          organizationUrl: organizationUrlChange,
          payoutUrl: payoutUrlChange,
          repoUrl: repoUrlChange,
          verified,
        },
        itemId: repoId,
      });
      handleClose();
    }
  };

  const handleCancel = () => {
    setDisplayEditView(false);
    setLogoChange(logo);
  };

  const handleSave = () => {
    dispatchEditRepo({
      editRequest: {
        description: descriptionChange,
        logo: logoChange,
        name: nameChange,
        organizationUrl: organizationUrlChange,
        repoUrl: repoUrlChange,
        verified,
      },
      itemId: repoId,
    });
  };

  const handleUploadLogo = async e => {
    const { files } = e.target;
    const formattedLogo = await getBase64(files[0]);
    setLogoChange(formattedLogo);
  };

  const isMobileOrTable = deviceView === 'mobile';

  const DetailViewComponent = (
    <Fragment>
      <ConditionalRender
        Component={
          <ButtonGroup>
            <StyledPrimaryButton
              label="Edit"
              onClick={() => setDisplayEditView(true)}
            />
            <PayoutButton
              label="Add Payout"
              onClick={() => setIsModalOpen(true)}
            />
          </ButtonGroup>
        }
        shouldRender={githubOwners.includes(githubId) && isSignedIn}
      />
      <DetailViewContainer>
        <Image src={logoChange} />
        <ContentWrapper>
          <HeaderWrapper>
            <NameWrapper>
              <Name>{name}</Name>
              <ConditionalRender
                Component={<StyledVerified />}
                shouldRender={verified}
              />
            </NameWrapper>
            <UrlWrapper>
              {!!organizationUrl && (
                <OrganizationUrl href={organizationUrl} target="_blank">
                  <StyledIcon>{LanguageIcon}</StyledIcon>
                </OrganizationUrl>
              )}
              <RepoUrl href={repoUrl} target="_blank">
                <StyledIcon>{GithubIcon}</StyledIcon>
              </RepoUrl>
            </UrlWrapper>
          </HeaderWrapper>
          <SubHeaderWrapper>
            <Description>{description}</Description>
            <TopLanguagesView preferredLanguages={preferredLanguages} />
          </SubHeaderWrapper>
        </ContentWrapper>
      </DetailViewContainer>
    </Fragment>
  );

  const EditViewComponent = (
    <Fragment>
      <ButtonGroup>
        <StyledSecondayButton label="Cancel" onClick={handleCancel} />
        <StyledPrimaryButton label="Save" onClick={handleSave} />
      </ButtonGroup>
      <DetailViewContainer>
        <EditLogoWrapper>
          <Image src={logoChange} />
          <BaseFileInput
            accept="image/png, image/jpeg"
            id="logoFileInput"
            onChange={handleUploadLogo}
          />
        </EditLogoWrapper>
        <ContentWrapper>
          <HeaderWrapper>
            <NameWrapper>
              <StyledBaseTextInput
                onChange={e => setNameChange(e.target.value)}
                placeholder="Repo Name"
                value={nameChange}
              />

              <ConditionalRender
                Component={<StyledVerified />}
                shouldRender={verified}
              />
            </NameWrapper>
          </HeaderWrapper>
          <UrlWrapper>
            <OrganizationUrl isEdit>
              <StyledIcon isEdit>{LanguageIcon}</StyledIcon>
              <StyledBaseTextInput
                onChange={e => setOrganizationUrlChange(e.target.value)}
                placeholder="Organization Url"
                value={organizationUrlChange}
              />
            </OrganizationUrl>

            <RepoUrl>
              <StyledIcon isEdit>{GithubIcon}</StyledIcon>
              <StyledBaseTextInput
                onChange={e => setRepoUrlChange(e.target.value)}
                placeholder="Repo Url"
                value={repoUrlChange}
              />
            </RepoUrl>
          </UrlWrapper>
          <StyledBaseTextInput
            multiline
            onChange={e => setDescriptionChange(e.target.value)}
            placeholder="Repo Description"
            value={descriptionChange}
            width="100%"
          />
          <TopLanguagesView preferredLanguages={preferredLanguages} />
        </ContentWrapper>
      </DetailViewContainer>
    </Fragment>
  );

  return (
    <DetailContainer>
      <BackNav label="Back to Repos" path="/repos" />
      <ConditionalRender
        Component={
          <StyledErrorSuccessBanner
            error={error}
            onClose={handleClearAlerts}
            success={success}
          />
        }
        shouldRender={
          isSignedIn && repos && !!repos.find(({ id }) => repoId === id)
        }
      />
      <ConditionalRender
        Component={DetailViewComponent}
        FallbackComponent={EditViewComponent}
        shouldRender={!displayEditView}
      />
      <ComponentsContainer>
        <RepoDonations
          earnedBounties={earnedBounties}
          maintainerProceeds={maintainerProceeds}
          payoutUrl={payoutUrl}
          totalFunded={totalFunded}
        />
        <BottomComponentsContainer>
          <MainComponents>
            <RepoDetail
              activeUser={activeUser}
              contributors={contributors}
              dispatchOpenModal={dispatchOpenModal}
              filterValues={filterValues}
              handleInputChange={handleInputChange}
              handleNav={handleNav}
              handleUpvote={handleUpvote}
              isSignedIn={isSignedIn}
              issues={issues}
            />
          </MainComponents>
          <SidebarComponent>
            <RecentActivityView activity={activity} />
            <Divider shouldHide={!isMobileOrTable} />
          </SidebarComponent>
        </BottomComponentsContainer>
      </ComponentsContainer>
      {isModalOpen && (
        <ModalDialog
          Component={PayoutModal}
          open={isModalOpen}
          propsToPassDown={{
            handleAddPayout,
            handleClose,
            payoutMethod,
            payoutUrlChange,
            payoutUrlError,
            setPayoutMethod,
            setPayoutUrlChange,
          }}
        />
      )}
    </DetailContainer>
  );
};

RepoDetailView.propTypes = {
  activeUser: T.object.isRequired,
  alerts: T.object.isRequired,
  data: T.object.isRequired,
  deviceView: T.string.isRequired,
  dispatchEditRepo: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  filterValues: T.object.isRequired,
  handleClearAlerts: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleUpvote: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
};

export default RepoDetailView;
