import React, { useEffect } from 'react';
import T from 'prop-types';

import { formatDollarAmount } from 'utils/globalHelpers';

import StatsTable from './StatsTable';
import {
  Amount,
  AmountSquare,
  AmountTitle,
  AmountWrapper,
  ComponentContainer,
  StatsContainer,
  StatsHeader,
  StyledSubHeader,
  TableWrapper,
} from './styledComponents';

const StatsPage = ({
  deviceView,
  isOverview,
  mostContribution,
  mostEarned,
  mostRep,
  totalAvailable,
  totalEarned,
  totalFunded,
  totalResolved,
}) => {
  useEffect(() => {
    document.title = 'Stats';
    window.scrollTo(0, 0);
  }, []);
  return (
    <StatsContainer>
      <StatsHeader>Rysolv Results</StatsHeader>
      <ComponentContainer>
        <StyledSubHeader>
          Measuring the impact that Rysolv has on open source development. Since
          its launch, users have contributed{' '}
          <b>{formatDollarAmount(totalFunded)}</b> and resolved{' '}
          <b>{totalResolved}</b> issues.
        </StyledSubHeader>

        <AmountWrapper>
          <AmountSquare>
            <AmountTitle>Total contributions</AmountTitle>
            <Amount>
              {totalFunded ? formatDollarAmount(totalFunded) : '–'}
            </Amount>
          </AmountSquare>
          <AmountSquare>
            <AmountTitle>Total earned</AmountTitle>
            <Amount>
              {totalEarned ? formatDollarAmount(totalEarned) : '–'}
            </Amount>
          </AmountSquare>
          <AmountSquare>
            <AmountTitle>Outstanding bounties</AmountTitle>
            <Amount>
              {totalAvailable ? formatDollarAmount(totalAvailable) : '–'}
            </Amount>
          </AmountSquare>
        </AmountWrapper>
        <TableWrapper>
          <StatsTable
            deviceView={deviceView}
            isOverview={isOverview}
            mostContribution={mostContribution}
            mostEarned={mostEarned}
            mostRep={mostRep}
          />
        </TableWrapper>
      </ComponentContainer>
    </StatsContainer>
  );
};

StatsPage.propTypes = {
  deviceView: T.string.isRequired,
  isOverview: T.bool.isRequired,
  mostContribution: T.array.isRequired,
  mostEarned: T.array.isRequired,
  mostRep: T.array.isRequired,
  totalAvailable: T.number.isRequired,
  totalEarned: T.number.isRequired,
  totalFunded: T.number.isRequired,
  totalResolved: T.number.isRequired,
};

export default StatsPage;
