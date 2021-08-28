import React from 'react';

class Calendly extends React.Component {
  componentDidMount() {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      'https://assets.calendly.com/assets/external/widget.js',
    );
    head.appendChild(script);
  }

  render() {
    return (
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/annapojawis23/15min"
        style={{
          height: '910px',
          minWidth: '320px',
        }}
      />
    );
  }
}

export default Calendly;
