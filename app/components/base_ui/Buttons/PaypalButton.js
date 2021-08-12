/* eslint-disable no-undef, react/jsx-no-undef, react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

import { formatPaypalTotal } from 'utils/globalHelpers';

import { PaypalButtonWrapper } from './styledComponents';

const CLIENT = {
  sandbox: process.env.PAYPAL_CLIENT_ID_TEST,
  production: process.env.PAYPAL_CLIENT_ID,
};

const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      showButton: false,
    };
    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  componentWillReceiveProps(nextProps, prevState) {
    const { dollarValue, isScriptLoaded, isScriptLoadSucceed } = nextProps;
    const IsLoadedButWasNotLoadedBefore =
      !this.state.showButton && !this.props.isScriptLoaded && isScriptLoaded;
    if (IsLoadedButWasNotLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
    if (prevState.dollarValue !== dollarValue) {
      if (dollarValue > 0.99) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    }
  }

  render() {
    const {
      dispatchPaypalPayment,
      dollarValue,
      emailValue,
      handleValidateInput,
      initialValue,
      issueId,
      setFundValue,
      values,
    } = this.props;
    const { disabled, showButton } = this.state;
    const formattedTotal = formatPaypalTotal(dollarValue);
    const payment = () =>
      paypal.rest.payment.create(ENV, CLIENT, {
        transactions: [
          {
            amount: {
              total: formattedTotal,
              currency: 'USD',
            },
          },
        ],
      });
    const onAuthorize = (data, actions) =>
      actions.payment.execute().then(() => {
        const paymentObj = {
          amount: dollarValue,
          email: emailValue,
          issueId,
        };
        dispatchPaypalPayment(paymentObj);
        if (setFundValue) setFundValue(initialValue);
      });
    const onClick = () => {
      handleValidateInput({ values });
    };
    return (
      <PaypalButtonWrapper disabled={disabled}>
        {showButton && (
          <paypal.Button.react
            client={CLIENT}
            commit
            env={ENV}
            onAuthorize={onAuthorize}
            onClick={onClick}
            onError={() =>
              dispatchPaypalPayment({
                error: 'There was an error with your Paypal payment.',
              })
            }
            payment={payment}
            style={{ tagline: false }}
          />
        )}
      </PaypalButtonWrapper>
    );
  }
}
export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(
  PaypalButton,
);
