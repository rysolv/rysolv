import React, { Fragment } from 'react';
import T from 'prop-types';

import {
  ConditionalRender,
  IconButton,
  MainTextInput,
} from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import AccountBalance from '../Balance';
import {
  AccountContainer,
  DeleteText,
  DeleteWrapper,
  IconButtonWrapper,
  InputWrapper,
  StyledPrimaryAsyncButton,
} from './styledComponents';
import { HeaderWrapper, StyledH3 } from '../styledComponents';

const CloseIcon = iconDictionary('close');
const DoneIcon = iconDictionary('done');
const EditIcon = iconDictionary('edit');

const UserAccount = ({
  balance,
  changeEmail,
  changeFirstName,
  changeLastName,
  changeUsername,
  dispatchOpenModal,
  email,
  firstName,
  fundedAmount,
  handleClose,
  handleDone,
  handleEdit,
  isDisabled,
  lastName,
  setChangeEmail,
  setChangeFirstName,
  setChangeLastName,
  setChangeUsername,
  setValue,
  userId,
  username,
  value,
}) => (
  <AccountContainer>
    <HeaderWrapper>
      <StyledH3>Account</StyledH3>
    </HeaderWrapper>
    <InputWrapper>
      <MainTextInput
        disabled={!changeFirstName}
        label="First Name"
        onChange={e => setValue(e.target.value)}
        value={!changeFirstName ? firstName : value}
      />
      <IconButtonWrapper>
        <ConditionalRender
          Component={
            <IconButton
              disabled={isDisabled}
              icon={EditIcon}
              label="Edit"
              onClick={() =>
                handleEdit({
                  changeInputState: setChangeFirstName,
                  currentValue: firstName,
                })
              }
            />
          }
          FallbackComponent={
            <Fragment>
              <IconButton
                icon={CloseIcon}
                label="Close"
                onClick={() =>
                  handleClose({ changeInputState: setChangeFirstName })
                }
              />
              <IconButton
                icon={DoneIcon}
                label="Save"
                onClick={() =>
                  handleDone({
                    changeInputState: setChangeFirstName,
                    field: 'firstName',
                  })
                }
              />
            </Fragment>
          }
          shouldRender={!changeFirstName}
        />
      </IconButtonWrapper>
    </InputWrapper>
    <InputWrapper>
      <MainTextInput
        disabled={!changeLastName}
        label="Last Name"
        onChange={e => setValue(e.target.value)}
        value={!changeLastName ? lastName : value}
      />
      <IconButtonWrapper>
        <ConditionalRender
          Component={
            <IconButton
              disabled={isDisabled}
              icon={EditIcon}
              label="Edit"
              onClick={() =>
                handleEdit({
                  changeInputState: setChangeLastName,
                  currentValue: lastName,
                })
              }
            />
          }
          FallbackComponent={
            <Fragment>
              <IconButton
                icon={CloseIcon}
                label="Close"
                onClick={() =>
                  handleClose({ changeInputState: setChangeLastName })
                }
              />
              <IconButton
                icon={DoneIcon}
                label="Save"
                onClick={() =>
                  handleDone({
                    changeInputState: setChangeLastName,
                    field: 'lastName',
                  })
                }
              />
            </Fragment>
          }
          shouldRender={!changeLastName}
        />
      </IconButtonWrapper>
    </InputWrapper>
    <InputWrapper>
      <MainTextInput
        disabled={!changeUsername}
        label="Username"
        onChange={e => setValue(e.target.value)}
        value={!changeUsername ? username : value}
      />
      <IconButtonWrapper>
        <ConditionalRender
          Component={
            <IconButton
              disabled={isDisabled}
              icon={EditIcon}
              label="Edit"
              onClick={() =>
                handleEdit({
                  changeInputState: setChangeUsername,
                  currentValue: username,
                })
              }
            />
          }
          FallbackComponent={
            <Fragment>
              <IconButton
                icon={CloseIcon}
                label="Close"
                onClick={() =>
                  handleClose({ changeInputState: setChangeUsername })
                }
              />
              <IconButton
                icon={DoneIcon}
                label="Save"
                onClick={() =>
                  handleDone({
                    changeInputState: setChangeUsername,
                    field: 'username',
                  })
                }
              />
            </Fragment>
          }
          shouldRender={!changeUsername}
        />
      </IconButtonWrapper>
    </InputWrapper>
    <InputWrapper>
      <MainTextInput
        disabled={!changeEmail}
        label="E-mail"
        onChange={e => setValue(e.target.value)}
        value={!changeEmail ? email : value}
      />
      <IconButtonWrapper>
        <ConditionalRender
          Component={
            <IconButton
              disabled={isDisabled}
              icon={EditIcon}
              label="Edit"
              onClick={() =>
                handleEdit({
                  changeInputState: setChangeEmail,
                  currentValue: email,
                })
              }
            />
          }
          FallbackComponent={
            <Fragment>
              <IconButton
                icon={CloseIcon}
                label="Close"
                onClick={() =>
                  handleClose({ changeInputState: setChangeEmail })
                }
              />
              <IconButton
                icon={DoneIcon}
                label="Save"
                onClick={() =>
                  handleDone({
                    changeInputState: setChangeEmail,
                    field: 'email',
                  })
                }
              />
            </Fragment>
          }
          shouldRender={!changeEmail}
        />
      </IconButtonWrapper>
    </InputWrapper>
    <HeaderWrapper>
      <StyledH3>Balance</StyledH3>
    </HeaderWrapper>
    <AccountBalance
      balance={balance}
      fundedAmount={fundedAmount}
      userId={userId}
    />
    <HeaderWrapper>
      <StyledH3>Delete my account</StyledH3>
    </HeaderWrapper>
    <DeleteWrapper>
      <DeleteText>All issues will be deleted upon removal.</DeleteText>
      <StyledPrimaryAsyncButton
        label="Delete my account"
        onClick={() => dispatchOpenModal({ modalState: 'deleteUser' })}
      />
    </DeleteWrapper>
  </AccountContainer>
);

UserAccount.propTypes = {
  balance: T.number,
  changeEmail: T.bool,
  changeFirstName: T.bool,
  changeLastName: T.bool,
  changeUsername: T.bool,
  dispatchOpenModal: T.func,
  email: T.string,
  firstName: T.string,
  fundedAmount: T.number,
  handleClose: T.func,
  handleDone: T.func,
  handleEdit: T.func,
  isDisabled: T.bool,
  lastName: T.string,
  setChangeEmail: T.func,
  setChangeFirstName: T.func,
  setChangeLastName: T.func,
  setChangeUsername: T.func,
  setValue: T.func,
  userId: T.string,
  username: T.string,
  value: T.oneOfType([T.array, T.number, T.string]),
};

export default UserAccount;
