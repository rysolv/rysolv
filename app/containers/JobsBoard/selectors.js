import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectJobsBoardDomain = state => state.jobsBoard || initialState;

const makeSelectJobsBoardList = () =>
  createSelector(
    makeSelectJobsBoard('filter'),
    makeSelectJobsBoard('jobs'),
    (filter, jobs) => {
      const filteredJobs = jobs.filter(
        ({ companyName, positionData: { title }, role, skills }) =>
          companyName
            .toLowerCase()
            .replace(/\s/g, '')
            .includes(filter.toLowerCase().replace(/\s/g, '')) ||
          title
            .toLowerCase()
            .replace(/\s/g, '')
            .includes(filter.toLowerCase().replace(/\s/g, '')) ||
          role.some(el =>
            el
              .toLowerCase()
              .replace(/\s/g, '')
              .includes(filter.toLowerCase().replace(/\s/g, '')),
          ) ||
          skills.some(({ name }) =>
            name
              .toLowerCase()
              .replace(/\s/g, '')
              .includes(filter.toLowerCase().replace(/\s/g, '')),
          ),
      );
      return filteredJobs;
    },
  );

const makeSelectJobsBoardLoading = prop =>
  createSelector(
    makeSelectJobsBoard('loading'),
    loading => loading[prop],
  );

const makeSelectJobsBoard = prop =>
  createSelector(
    selectJobsBoardDomain,
    substate => substate[prop],
  );

export default selectJobsBoardDomain;
export {
  makeSelectJobsBoard,
  makeSelectJobsBoardList,
  makeSelectJobsBoardLoading,
};
