import React from 'react';
import T from 'prop-types';

import { formatDollarAmount, getPaymentMethod } from 'utils/globalHelpers';

import {
  Amount,
  DetailLink,
  DonationRow,
  DonationsContainer,
  DonationTitle,
} from './styledComponents';

const RepoDonations = ({
  earnedBounties,
  maintainerProceeds,
  payoutUrl,
  totalFunded,
}) => {
  const hasPayoutUrl = !payoutUrl;

  return (
    <DonationsContainer>
      <DonationRow hasPayoutUrl={hasPayoutUrl}>
        <DonationTitle>Outstanding Bounties</DonationTitle>
        <Amount>
          {formatDollarAmount(totalFunded - earnedBounties, true)}
        </Amount>
      </DonationRow>
      <DonationRow hasPayoutUrl={hasPayoutUrl}>
        <DonationTitle>Earned Bounties</DonationTitle>
        <Amount>{formatDollarAmount(earnedBounties, true)}</Amount>
      </DonationRow>
      {payoutUrl && (
        <DonationRow hasPayoutUrl={hasPayoutUrl}>
          <DonationTitle>Maintainer Proceeds</DonationTitle>
          <DetailLink href={payoutUrl} target="_blank">
            {getPaymentMethod(payoutUrl)}
          </DetailLink>
          <Amount>{formatDollarAmount(maintainerProceeds, true)}</Amount>
        </DonationRow>
      )}
    </DonationsContainer>
  );
};

RepoDonations.propTypes = {
  earnedBounties: T.number.isRequired,
  maintainerProceeds: T.number.isRequired,
  payoutUrl: T.string,
  totalFunded: T.number.isRequired,
};

export default RepoDonations;
