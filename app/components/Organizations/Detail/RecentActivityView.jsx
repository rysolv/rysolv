/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { ProfileImage } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  FundContent,
  FundDate,
  FundsContainer,
  FundSentence,
  FundWrapper,
  ProfileImageWrapper,
  RecentActivityContainer,
  StyledTitled,
  StyledWord,
  StyledWordLink,
} from './styledComponents';

export class RecentActivityView extends React.PureComponent {
  render() {
    const { fundData, handleNav } = this.props;
    return (
      <Fragment>
        <RecentActivityContainer>
          <StyledTitled>Recent activities</StyledTitled>
          <FundsContainer>
            {fundData.map(
              (
                { fundAmount, fundDate, id, issueName, user, userImage },
                index,
              ) => (
                <FundWrapper key={`list-item-${index}`}>
                  <ProfileImageWrapper>
                    <ProfileImage
                      alt={user}
                      detailRoute={`/admin/users/detail/${id}`}
                      handleNav={handleNav}
                      profilePic={userImage}
                      size="4rem"
                    />
                  </ProfileImageWrapper>
                  <FundContent>
                    <FundSentence>
                      <StyledWordLink>{user}</StyledWordLink>
                      &nbsp;funded&nbsp;
                      <StyledWord>{formatDollarAmount(fundAmount)}</StyledWord>
                      &nbsp;for&nbsp;
                      <br />
                      <StyledWordLink>{issueName}</StyledWordLink>
                    </FundSentence>
                    <FundDate>
                      About {moment(fundDate, 'MM/DD/YYYY').fromNow()}
                    </FundDate>
                  </FundContent>
                </FundWrapper>
              ),
            )}
          </FundsContainer>
        </RecentActivityContainer>
      </Fragment>
    );
  }
}

RecentActivityView.propTypes = {
  fundData: T.array,
  handleNav: T.func.isRequired,
};

export default RecentActivityView;
