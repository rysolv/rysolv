import { createSelector } from 'reselect';

const selectAdminProps = (_state, props) => props;

const getAdminType = () =>
  createSelector(
    selectAdminProps,
    props => {
      const {
        location: { pathname },
      } = props;
      return pathname.split('/')[2];
    },
  );

const getMatchParams = param =>
  createSelector(
    selectAdminProps,
    props => props.match.params[param],
  );

export { getAdminType, getMatchParams };
