/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import { SAVE_CANDIDATE, SELECT_POSITION } from './constants';

export const initialState = {
  candidates: [
    {
      firstName: 'Jane',
      isInterviewRequested: true,
      isSaved: true,
      languages: ['JavaScript', 'Python', 'Java'],
      lastName: 'Doe',
      lastPosition: 'Software Engineer at Apple',
      location: 'San Francisco, CA',
      percentMatch: 75,
      profilePic:
        'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/9b156bc2-5ec1-4865-a51a-8a25d0e158b0',
      salary: '$110,000',
      type: 'full-time',
      yearsOfExperience: '2-5 years',
    },
  ],
  error: false,
  loading: false,
  selectedPosition: '',
};

const companyDashboardReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case SAVE_CANDIDATE: {
      const { index } = payload;
      draft.candidates[index].isSaved = !draft.candidates[index].isSaved;
      break;
    }
    case SELECT_POSITION: {
      const { position } = payload;
      draft.selectedPosition = position;
      break;
    }
  }
}, initialState);

export default companyDashboardReducer;
