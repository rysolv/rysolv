/* eslint-disable indent */
import React, { Fragment, useEffect, useState } from 'react';
import T from 'prop-types';

import { CheckboxWithLabel, ConditionalRender } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  BalanceAmount,
  BalanceSquare,
  BalanceTitle,
  DisclaimerText,
  DisplayText,
  Divider,
  InputHeader,
  LinkWrapper,
  StyledBackNav,
  StyledBaseDropDownMenu,
  StyledBaseTextInput,
  StyledCheckboxWrapper,
  StyledPrimaryAsyncButton,
  StyledText,
  WithdrawalInputWrapper,
} from '../styledComponents';
import { StyledH3 } from '../../styledComponents';

const WithdrawalFormComponent = ({
  balance,
  email,
  handleClearAllAlerts,
  handleClearErrors,
  handleValidateInput,
  handleWithdrawFunds,
  inputErrors: { email: emailError, transferValue: transferValueError },
  setDisplayBottom,
}) => {
  const [isPaypalEmailChecked, setIsPaypalEmailChecked] = useState(true);
  const [paypalEmail, setPaypalEmail] = useState('');
  const [transferLocation, setTransferLocation] = useState('PayPal');
  const [transferValue, setTransferValue] = useState('0');

  const emailToSend = isPaypalEmailChecked ? email : paypalEmail;

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      handleClearAllAlerts();
      handleClearErrors();
      setDisplayBottom(false);
    };
  }, []);

  const handleChangeDollarValue = e => {
    const { value } = e.target;
    if (value <= balance) {
      const string = value
        ? value
            .replace(',', '.')
            .replace(/[^\d.]/g, '')
            .replace(/\./, 'x')
            .replace(/\./g, '')
            .replace(/x/, '.')
        : '0';
      const formattedString =
        string.length === 1
          ? string.split('.')
          : string.replace(/^0+/, '').split('.');

      if (formattedString.length === 1) {
        const formattedValue = formattedString.join('.');
        setTransferValue(formattedValue);
      }
      if (formattedString.length === 2) {
        formattedString[0] =
          formattedString[0] === '' ? '0' : formattedString[0];
        formattedString[1] = formattedString[1]
          ? formattedString[1].slice(0, 2)
          : '';
        const formattedValue = formattedString.join('.');
        setTransferValue(formattedValue);
      }
    }
  };
  return (
    <Fragment>
      <StyledBackNav label="Back to Account" path="/settings/account" />
      <StyledH3>Withdraw funds</StyledH3>
      <StyledText>
        Funds earned on the Rysolv platform are available for withdrawal via
        PayPal account. Expect to receive funds within 24 hours of withdrawal.
        <br />
        <br />
        For issues involving payments, please contact{' '}
        <LinkWrapper href="mailto: support@rysolv.com">
          support@rysolv.com
        </LinkWrapper>
        .
      </StyledText>
      <BalanceSquare isCentered>
        <BalanceTitle>Available to withdraw</BalanceTitle>
        <BalanceAmount>
          {balance ? `${formatDollarAmount(balance)} USD` : '–'}
        </BalanceAmount>
      </BalanceSquare>
      <div>
        <WithdrawalInputWrapper>
          <InputHeader>Transfer to:</InputHeader>
          <StyledBaseDropDownMenu
            handleChange={value => setTransferLocation(value)}
            selectedValue={transferLocation}
            values={['PayPal']}
          />
        </WithdrawalInputWrapper>
        <WithdrawalInputWrapper width="100%">
          <StyledCheckboxWrapper>
            <CheckboxWithLabel
              checked={isPaypalEmailChecked}
              label={`Send to  ${email}`}
              onChange={() => setIsPaypalEmailChecked(!isPaypalEmailChecked)}
            />
          </StyledCheckboxWrapper>
          <ConditionalRender
            Component={
              <WithdrawalInputWrapper>
                <InputHeader>Paypal email:</InputHeader>
                <StyledBaseTextInput
                  error={!!emailError}
                  helperText={emailError}
                  onBlur={() =>
                    handleValidateInput({
                      field: 'email',
                      values: { email: paypalEmail },
                    })
                  }
                  onChange={e => setPaypalEmail(e.target.value)}
                  value={paypalEmail}
                  variant="outlined"
                />
              </WithdrawalInputWrapper>
            }
            shouldRender={!isPaypalEmailChecked}
          />
        </WithdrawalInputWrapper>
        <WithdrawalInputWrapper>
          <InputHeader>Amount to withdraw:</InputHeader>
          <StyledBaseTextInput
            inputProps={{ maxLength: 7 }}
            error={!!transferValueError}
            helperText={transferValueError}
            onBlur={() =>
              handleValidateInput({
                field: 'transferValue',
                values: { transferValue },
              })
            }
            onChange={e => handleChangeDollarValue(e)}
            value={transferValue}
            variant="outlined"
          />
        </WithdrawalInputWrapper>
      </div>
      <Divider />
      <div>
        <WithdrawalInputWrapper isRow isThin>
          <InputHeader>Transaction Fee:</InputHeader>
          <DisplayText>
            {formatDollarAmount(transferValue * 0.03 + 0.3)}
          </DisplayText>
        </WithdrawalInputWrapper>
        <DisclaimerText>
          A 3% + $0.30 standard transaction fee will be added.
        </DisclaimerText>
        <WithdrawalInputWrapper isRow>
          <InputHeader>Transfer to PayPal:</InputHeader>
          <DisplayText>
            {transferValue > 0
              ? `${formatDollarAmount(
                  transferValue - transferValue * 0.03 + 0.3,
                )} USD`
              : '–'}
          </DisplayText>
        </WithdrawalInputWrapper>
      </div>
      <StyledPrimaryAsyncButton
        disabled={
          !emailToSend ||
          !!transferValueError ||
          transferValue <= 0 ||
          transferValue === '.'
        }
        label="Withdraw Funds"
        onClick={() =>
          handleWithdrawFunds({
            email: emailToSend,
            transferValue,
            values: { email: emailToSend, transferValue },
          })
        }
      />
    </Fragment>
  );
};

WithdrawalFormComponent.propTypes = {
  balance: T.number.isRequired,
  email: T.string.isRequired,
  handleClearAllAlerts: T.func.isRequired,
  handleClearErrors: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  handleWithdrawFunds: T.func.isRequired,
  inputErrors: T.object.isRequired,
  setDisplayBottom: T.func.isRequired,
};

export default WithdrawalFormComponent;
