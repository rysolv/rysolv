/* eslint-disable no-undef, react/jsx-no-undef, react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

const CLIENT = {
  sandbox: process.env.PAYPAY_CLIENT_ID,
  production: process.env.PAYPAY_CLIENT_ID,
};

const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;
    const isLoadedButWasntLoadedBefore =
      !this.state.showButton && !this.props.isScriptLoaded && isScriptLoaded;
    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
  }

  render() {
    const {
      dispatchPaypalPayment,
      issueId,
      organizationId,
      total,
      userId,
    } = this.props;
    const { showButton } = this.state;
    const formattedTotal = Number(total).toFixed(2);
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
          amount: formattedTotal,
          issueId,
          organizationId,
          userId,
        };
        dispatchPaypalPayment(paymentObj);
      });
    return (
      <div>
        {showButton && (
          <paypal.Button.react
            client={CLIENT}
            commit
            env={ENV}
            onAuthorize={onAuthorize}
            onError={() =>
              dispatchPaypalPayment({
                error: 'There was an error with your Paypal payment.',
              })
            }
            payment={payment}
            style={{ tagline: false }}
          />
        )}
      </div>
    );
  }
}
export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(
  PaypalButton,
);
