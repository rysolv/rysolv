/* eslint-disable no-undef, react/jsx-no-undef, react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

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
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel,
    } = this.props;
    const { showButton } = this.state;
    const payment = () =>
      paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency,
            },
          },
        ],
      });
    const onAuthorize = (data, actions) =>
      actions.payment.execute().then(() => {
        const paymentObj = {
          paid: true,
          cancelled: false,
          payerID: data.payerID,
          paymentID: data.paymentID,
          paymentToken: data.paymentToken,
          returnUrl: data.returnUrl,
        };
        onSuccess(paymentObj);
      });
    return (
      <div>
        {showButton && (
          <paypal.Button.react
            client={client}
            commit={commit}
            env={env}
            onAuthorize={onAuthorize}
            onCancel={onCancel}
            onError={onError}
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
