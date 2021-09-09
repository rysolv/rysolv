import { put, takeLatest } from 'redux-saga/effects';

// import { post } from 'utils/request';

import {
  fetchCompanyMatchesFailure,
  fetchCompanyMatchesSuccess,
} from './actions';
import { FETCH_COMPANY_MATCHES } from './constants';

export function* fetchCompanyMatchesSaga() {
  // const query = `
  //   query {
  //     getCompanyMatches {
  //       __typename
  //       ... on CompanyMatchesArray {
  //         companyMatchesArray {
  //           candidates
  //           position
  //         }
  //       }
  //       ... on Error {
  //         message
  //       }
  //     }
  //   }
  // `;
  try {
    // const graphql = JSON.stringify({ query });
    // const {
    //   data: {
    //     getCompanyMatches: { __typename, companyMatches, message },
    //   },
    // } = yield call(post, '/graphql', graphql);
    const companyMatches = [
      {
        candidates: [],
        position: {
          id: '',
          location: 'remote',
          title: 'Fullstack Engineer',
        },
      },
      {
        candidates: [
          {
            firstName: 'Jane',
            isHired: false,
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
        position: {
          id: '',
          location: 'remote',
          title: 'Junior Frontend Engineer',
        },
      },
      {
        candidates: [],
        position: {
          id: '',
          location: 'remote',
          title: 'Senior Backend Engineer',
        },
      },
    ];
    // if (__typename === 'Error') throw message;
    yield put(fetchCompanyMatchesSuccess({ companyMatches }));
  } catch (error) {
    yield put(fetchCompanyMatchesFailure({ error }));
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_COMPANY_MATCHES, fetchCompanyMatchesSaga);
}
