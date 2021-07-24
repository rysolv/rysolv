import React, { Fragment } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import RecruitmentForm from './RecruitmentForm';
import {
  // BackgroundHollowCircleBottomIcon,
  // BackgroundHollowCircleTopIcon,
  // BackgroundSolidCircleIcon,
  CompanyRecruitmentContainer,
  CompanyRecruitmentHeader,
  CompanyRecruitmentSubheader,
  CompanyRecruitmentWrapper,
  HeaderImageLeftIcon,
  HeaderImageRightIcon,
} from './styledComponents';

// const BackgroundHollowCircle = iconDictionary('backgroundHollowCircle');
// const BackgroundSolidCircle = iconDictionary('backgroundSolidCircle');
const HeaderImageLeft = iconDictionary('headerImageLeft');
const HeaderImageRight = iconDictionary('headerImageRight');

const CompanyRecruitment = ({
  dispatchResetForm,
  dispatchSendForm,
  error,
  loading,
  success,
}) => (
  <Fragment>
    <CompanyRecruitmentContainer>
      <CompanyRecruitmentWrapper>
        <div>
          <CompanyRecruitmentHeader>
            Lorem ipsum dolor sit amet?
          </CompanyRecruitmentHeader>
          <CompanyRecruitmentSubheader>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </CompanyRecruitmentSubheader>
        </div>
        <RecruitmentForm
          dispatchResetForm={dispatchResetForm}
          dispatchSendForm={dispatchSendForm}
          error={error}
          loading={loading}
          success={success}
        />
      </CompanyRecruitmentWrapper>
    </CompanyRecruitmentContainer>
    <HeaderImageRightIcon>{HeaderImageRight}</HeaderImageRightIcon>
    <HeaderImageLeftIcon>{HeaderImageLeft}</HeaderImageLeftIcon>
  </Fragment>
);

CompanyRecruitment.propTypes = {
  dispatchResetForm: T.func,
  dispatchSendForm: T.func,
  error: T.bool,
  loading: T.bool,
  success: T.bool,
};

export default CompanyRecruitment;
