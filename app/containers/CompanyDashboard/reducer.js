/* eslint-disable consistent-return, default-case, no-param-reassign */
import produce from 'immer';

import {
  CLOSE_MODAL_STATE,
  OPEN_MODAL_STATE,
  SAVE_CANDIDATE,
  SELECT_POSITION,
} from './constants';

export const initialState = {
  companyRecruitment: {
    'Fullstack Engineer': [],
    'Junior Front-end Engineer': [
      {
        firstName: 'Jane',
        isInterviewRequested: false,
        isSaved: true,
        languages: ['JavaScript', 'Python', 'Java'],
        lastName: 'Doe',
        lastPosition: 'Software Engineer at Apple',
        location: 'San Francisco, CA',
        percentMatch: 80,
        profilePic:
          'https://rysolv.s3.us-east-2.amazonaws.com/rysolv/9b156bc2-5ec1-4865-a51a-8a25d0e158b0',
        salary: '$110,000',
        type: 'full-time',
        yearsOfExperience: '2-5 years',
      },
    ],
    'Senior Back-end Engineer': [],
  },
  error: false,
  isModalOpen: false,
  loading: false,
  selectedPosition: 'Junior Front-end Engineer',
};

const companyDashboardReducer = produce((draft, { payload, type }) => {
  switch (type) {
    case CLOSE_MODAL_STATE: {
      draft.isModalOpen = false;
      break;
    }
    case OPEN_MODAL_STATE: {
      draft.isModalOpen = true;
      break;
    }
    case SAVE_CANDIDATE: {
      const { index } = payload;
      const { selectedPosition } = draft;
      draft.companyRecruitment[selectedPosition][index].isSaved = !draft
        .companyRecruitment[selectedPosition][index].isSaved;
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
