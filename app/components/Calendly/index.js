import React from 'react';

import { CalendlyContainer } from './styledComponents';

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
      <CalendlyContainer
        className="calendly-inline-widget"
        data-url="https://calendly.com/annapojawis23/15min"
      />
    );
  }
}

export default Calendly;
