import React, { Fragment } from 'react';
import T from 'prop-types';

import Calendly from 'components/Calendly';

import { ViewContainer } from './styledComponents';

const CalendlyView = ({ dispatchChangeView }) => (
  <Fragment>
    <ViewContainer isCalendlyView>
      <Calendly dispatchChangeView={dispatchChangeView} />
    </ViewContainer>
  </Fragment>
);

CalendlyView.propTypes = { dispatchChangeView: T.func.isRequired };

export default CalendlyView;
