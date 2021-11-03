import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import {
  EmptyGithubLinkComponent,
  GithubEditComponent,
  GithubLinkComponent,
} from './GithubLinkComponents';
import {
  EmptyPersonalLinkComponent,
  PersonalEditComponent,
  PersonalLinkComponent,
} from './PersonalLinkComponents';
import {
  EmptyStackoverflowLinkComponent,
  StackoverflowEditComponent,
  StackoverflowLinkComponent,
} from './StackoverflowLinkComponents';

import { LinksWrapper } from '../styledComponents';

const UserLinksComponent = ({
  changeGithub,
  changePersonal,
  changeStackoverflow,
  githubLink,
  githubLinkError,
  handleClose,
  handleEdit,
  handleSubmitInputChange,
  handleValidateInput,
  isDisabled,
  personalLink,
  personalLinkError,
  setChangeGithub,
  setChangePersonal,
  setChangeStackoverflow,
  setValue,
  stackoverflowLink,
  stackoverflowLinkError,
  value,
}) => (
  <LinksWrapper>
    <ConditionalRender
      Component={
        <ConditionalRender
          Component={GithubLinkComponent}
          FallbackComponent={EmptyGithubLinkComponent}
          propsToPassDown={{
            githubLink,
            handleEdit,
            isDisabled,
            setChangeGithub,
          }}
          shouldRender={!!githubLink}
        />
      }
      FallbackComponent={
        <GithubEditComponent
          githubLinkError={githubLinkError}
          handleClose={handleClose}
          handleSubmitInputChange={handleSubmitInputChange}
          handleValidateInput={handleValidateInput}
          setChangeGithub={setChangeGithub}
          setValue={setValue}
          value={value}
        />
      }
      shouldRender={!changeGithub}
    />
    <ConditionalRender
      Component={
        <ConditionalRender
          Component={PersonalLinkComponent}
          FallbackComponent={EmptyPersonalLinkComponent}
          propsToPassDown={{
            handleEdit,
            isDisabled,
            personalLink,
            setChangePersonal,
          }}
          shouldRender={!!personalLink}
        />
      }
      FallbackComponent={
        <PersonalEditComponent
          handleClose={handleClose}
          handleSubmitInputChange={handleSubmitInputChange}
          handleValidateInput={handleValidateInput}
          personalLinkError={personalLinkError}
          setChangePersonal={setChangePersonal}
          setValue={setValue}
          value={value}
        />
      }
      shouldRender={!changePersonal}
    />
    <ConditionalRender
      Component={
        <ConditionalRender
          Component={StackoverflowLinkComponent}
          FallbackComponent={EmptyStackoverflowLinkComponent}
          propsToPassDown={{
            handleEdit,
            isDisabled,
            setChangeStackoverflow,
            stackoverflowLink,
          }}
          shouldRender={!!stackoverflowLink}
        />
      }
      FallbackComponent={
        <StackoverflowEditComponent
          handleClose={handleClose}
          handleSubmitInputChange={handleSubmitInputChange}
          handleValidateInput={handleValidateInput}
          setChangeStackoverflow={setChangeStackoverflow}
          setValue={setValue}
          stackoverflowLinkError={stackoverflowLinkError}
          value={value}
        />
      }
      shouldRender={!changeStackoverflow}
    />
  </LinksWrapper>
);

UserLinksComponent.propTypes = {
  changeGithub: T.bool,
  changePersonal: T.bool,
  changeStackoverflow: T.bool,
  githubLink: T.string,
  githubLinkError: T.string,
  handleClose: T.func,
  handleEdit: T.func,
  handleSubmitInputChange: T.func,
  handleValidateInput: T.func,
  isDisabled: T.bool,
  personalLink: T.string,
  personalLinkError: T.string,
  setChangeGithub: T.func,
  setChangePersonal: T.func,
  setChangeStackoverflow: T.func,
  setValue: T.func,
  stackoverflowLink: T.string,
  stackoverflowLinkError: T.string,
  value: T.string,
};

export default UserLinksComponent;
