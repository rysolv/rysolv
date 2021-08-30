import React from 'react';
import T from 'prop-types';

import { isCalendlyScheduledEvent } from './helpers';
import { CalendlyContainer } from './styledComponents';

class Calendly extends React.Component {
  componentDidMount() {
    const { dispatchChangeView } = this.props;

    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      'https://assets.calendly.com/assets/external/widget.js',
    );
    head.appendChild(script);

    window.addEventListener('message', e => {
      if (dispatchChangeView && isCalendlyScheduledEvent(e)) {
        dispatchChangeView({ view: 3 });
      }
    });
  }

  render() {
    const { isCompanyRecruitment } = this.props;
    const dataUrl = isCompanyRecruitment
      ? 'https://calendly.com/rysolv/15-min-company-intro'
      : 'https://calendly.com/rysolv/15-min-candidate-intro';

    return (
      <CalendlyContainer
        className="calendly-inline-widget"
        data-url={dataUrl}
        isCompanyRecruitment={isCompanyRecruitment}
      />
    );
  }
}

Calendly.defaultProps = { isCompanyRecruitment: false };

Calendly.propTypes = {
  dispatchChangeView: T.func,
  isCompanyRecruitment: T.bool,
};

export default Calendly;
