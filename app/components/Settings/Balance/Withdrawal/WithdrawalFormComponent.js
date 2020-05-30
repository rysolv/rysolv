/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import { BackNav } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  BalanceAmount,
  BalanceSquare,
  BalanceTitle,
  DisplayText,
  Divider,
  InputHeader,
  StyledBaseDropDownMenu,
  StyledBaseInput,
  StyledPrimaryAsyncButton,
  StyledText,
  WithdrawalInputContainer,
  WithdrawalInputWrapper,
} from '../styledComponents';
import { StyledH3 } from '../../styledComponents';

const WithdrawalFormComponent = ({ balance, handleNav }) => {
  const [transferLocation, setTransferLocation] = useState('PayPal');
  const [transferValue, setTransferValue] = useState('0');

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
      <BackNav
        label="Back to Account"
        handleNav={handleNav}
        path="/settings/account"
      />
      <StyledH3>Withdraw funds</StyledH3>
      <StyledText>
        Funds earned on the Rysolv platform are available for withdrawal via
        PayPal account.
      </StyledText>
      <BalanceSquare isCentered>
        <BalanceTitle>Available to withdraw</BalanceTitle>
        <BalanceAmount>
          {balance ? `${formatDollarAmount(balance)} USD` : '–'}
        </BalanceAmount>
      </BalanceSquare>
      <WithdrawalInputContainer>
        <WithdrawalInputWrapper>
          <InputHeader>Transfer to:</InputHeader>
          <StyledBaseDropDownMenu
            handleChange={value => setTransferLocation(value)}
            selectedValue={transferLocation}
            values={['PayPal']}
          />
        </WithdrawalInputWrapper>
        <WithdrawalInputWrapper>
          <InputHeader>Amount to withdraw:</InputHeader>
          <StyledBaseInput
            inputProps={{ maxLength: 7 }}
            onChange={e => handleChangeDollarValue(e)}
            value={transferValue}
          />
        </WithdrawalInputWrapper>
      </WithdrawalInputContainer>
      <Divider />
      <WithdrawalInputContainer>
        <WithdrawalInputWrapper isRow isThin>
          <InputHeader>PayPal fee:</InputHeader>
          <DisplayText>$1.00</DisplayText>
        </WithdrawalInputWrapper>
        <WithdrawalInputWrapper isRow>
          <InputHeader>Transfer to PayPal:</InputHeader>
          <DisplayText>
            {transferValue > 0 ? `${formatDollarAmount(transferValue - 1)} USD` : '–'}
          </DisplayText>
        </WithdrawalInputWrapper>
      </WithdrawalInputContainer>
      <StyledPrimaryAsyncButton label="Withdraw Funds" onClick={() => {}} />
    </Fragment>
  );
};

WithdrawalFormComponent.propTypes = {
  balance: T.number.isRequired,
  handleNav: T.func.isRequired,
};

export default WithdrawalFormComponent;
