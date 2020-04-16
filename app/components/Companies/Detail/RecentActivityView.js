/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { formatDollarAmount } from 'utils/globalHelpers';

import {
  FundContent,
  FundDate,
  FundsContainer,
  FundSentence,
  FundWrapper,
  RecentActivityContainer,
  StyledTitled,
  StyledWord,
  StyledWordLink,
  UserImage,
} from './styledComponents';

export class RecentActivityView extends React.PureComponent {
  render() {
    const { fundData } = this.props;

    return (
      <Fragment>
        <RecentActivityContainer>
          <StyledTitled>Recent activities</StyledTitled>
          <FundsContainer>
            {fundData.map(
              ({ fundAmount, fundDate, issueName, user, userImage }, index) => (
                <FundWrapper key={`list-item-${index}`}>
                  <UserImage src={userImage} />
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
};

export default RecentActivityView;
