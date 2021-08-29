import React from 'react';
import T from 'prop-types';

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
    const { isCompanyRecruitment } = this.props;
    const dataUrl = isCompanyRecruitment
      ? 'https://calendly.com/annapojawis23/15min'
      : 'https://calendly.com/annapojawis23/15min';

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

Calendly.propTypes = { isCompanyRecruitment: T.bool };

export default Calendly;
