export const isCalendlyScheduledEvent = e =>
  e.data.event &&
  e.data.event.indexOf('calendly') === 0 &&
  e.data.event === 'calendly.event_scheduled';
