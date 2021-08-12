import React, { Fragment } from 'react';
import T from 'prop-types';

import {
  CheckboxWithLabel,
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
  dispatchSaveChange,
  dollarsEarned,
  email,
  firstName,
  handleClose,
  handleEdit,
  handleNav,
  handleSubmitEmailChange,
  handleSubmitInputChange,
  handleValidateInput,
  inputErrors: {
    email: emailError,
    firstName: firstNameError,
    lastName: lastNameError,
    username: usernameError,
  },
  isDisabled,
  lastName,
  receiveWeeklyEmails,
  setChangeEmail,
  setChangeFirstName,
  setChangeLastName,
  setChangeUsername,
  setDisplayBottom,
  setValue,
  username,
  value,
}) => (
  <AccountContainer>
    <HeaderWrapper>
      <StyledH3 removeMarginTop>Account</StyledH3>
    </HeaderWrapper>
    <InputWrapper>
      <MainTextInput
        disabled={!changeFirstName}
        error={!!firstNameError}
        helperText={firstNameError}
        label="First Name"
        onBlur={() =>
          handleValidateInput({
            field: 'firstName',
            values: { firstName: value },
          })
        }
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
                  handleSubmitInputChange({
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
        error={!!lastNameError}
        helperText={lastNameError}
        label="Last Name"
        onBlur={() =>
          handleValidateInput({
            field: 'lastName',
            values: { lastName: value },
          })
        }
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
                  handleSubmitInputChange({
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
        error={!!usernameError}
        helperText={usernameError}
        label="Username"
        onBlur={() =>
          handleValidateInput({
            field: 'username',
            values: { username: value },
          })
        }
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
                  handleSubmitInputChange({
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
        error={!!emailError}
        helperText={emailError}
        label="E-mail"
        onBlur={() =>
          handleValidateInput({
            field: 'email',
            values: { email: value },
          })
        }
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
                onClick={handleSubmitEmailChange}
              />
            </Fragment>
          }
          shouldRender={!changeEmail}
        />
      </IconButtonWrapper>
    </InputWrapper>
    <HeaderWrapper>
      <StyledH3>Email Notifications</StyledH3>
    </HeaderWrapper>
    <InputWrapper>
      <CheckboxWithLabel
        checked={receiveWeeklyEmails}
        label="Get weekly notifications for recommended issues"
        onChange={() => {
          dispatchSaveChange({
            field: 'receiveWeeklyEmails',
            value: !receiveWeeklyEmails,
          });
        }}
      />
    </InputWrapper>
    <HeaderWrapper>
      <StyledH3>Balance</StyledH3>
    </HeaderWrapper>
    <AccountBalance
      balance={balance}
      dollarsEarned={dollarsEarned}
      handleNav={handleNav}
      setDisplayBottom={setDisplayBottom}
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
  dispatchSaveChange: T.func.isRequired,
  dollarsEarned: T.number,
  email: T.string,
  firstName: T.string,
  handleClose: T.func,
  handleEdit: T.func,
  handleNav: T.func,
  handleSubmitEmailChange: T.func,
  handleSubmitInputChange: T.func,
  handleValidateInput: T.func.isRequired,
  inputErrors: T.object.isRequired,
  isDisabled: T.bool,
  lastName: T.string,
  receiveWeeklyEmails: T.bool.isRequired,
  setChangeEmail: T.func,
  setChangeFirstName: T.func,
  setChangeLastName: T.func,
  setChangeUsername: T.func,
  setDisplayBottom: T.func,
  setValue: T.func,
  username: T.string,
  value: T.oneOfType([T.array, T.number, T.string]),
};

export default UserAccount;
