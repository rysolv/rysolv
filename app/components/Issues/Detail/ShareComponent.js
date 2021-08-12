import React, { Fragment } from 'react';
import T from 'prop-types';

import { formatDollarAmount } from 'utils/globalHelpers';

import { buttonColorDictionary } from './constants';
import {
  SharingButtonIcon,
  SharingButtonIconWrapper,
  StyledSharingLink,
} from './styledComponents';

const ShareComponent = ({ fundedAmount, issueId }) => {
  const text = encodeURIComponent(
    `Earn ${formatDollarAmount(fundedAmount)} bounty on Rysolv!`,
  );
  const link = encodeURIComponent(
    `http://rysolv.com/issues/details/${issueId}`,
  );
  return (
    <Fragment>
      <StyledSharingLink
        aria-label="Share on Twitter"
        href={`https://twitter.com/intent/tweet/?text=${text}&url=${link}`}
        rel="noopener"
        target="_blank"
      >
        <SharingButtonIconWrapper color={buttonColorDictionary.twitter}>
          <SharingButtonIcon aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
            </svg>
          </SharingButtonIcon>
          Share on Twitter
        </SharingButtonIconWrapper>
      </StyledSharingLink>
      <StyledSharingLink
        aria-label="Share on Reddit"
        href={`https://reddit.com/submit/?url=${link}&resubmit=true&title=${text}`}
        rel="noopener"
        target="_blank"
      >
        <SharingButtonIconWrapper color={buttonColorDictionary.reddit}>
          <SharingButtonIcon aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.75-1.64-6.07-1.72.08-1.1.4-3.05 1.52-3.7.72-.4 1.73-.24 3 .5C17.2 6.3 18.46 7.5 20 7.5c1.65 0 3-1.35 3-3s-1.35-3-3-3c-1.38 0-2.54.94-2.88 2.22-1.43-.72-2.64-.8-3.6-.25-1.64.94-1.95 3.47-2 4.55-2.33.08-4.45.7-6.1 1.72C4.86 8.98 3.96 8.5 3 8.5c-1.65 0-3 1.35-3 3 0 1.32.84 2.44 2.05 2.84-.03.22-.05.44-.05.66 0 3.86 4.5 7 10 7s10-3.14 10-7c0-.22-.02-.44-.05-.66 1.2-.4 2.05-1.54 2.05-2.84zM2.3 13.37C1.5 13.07 1 12.35 1 11.5c0-1.1.9-2 2-2 .64 0 1.22.32 1.6.82-1.1.85-1.92 1.9-2.3 3.05zm3.7.13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9.8 4.8c-1.08.63-2.42.96-3.8.96-1.4 0-2.74-.34-3.8-.95-.24-.13-.32-.44-.2-.68.15-.24.46-.32.7-.18 1.83 1.06 4.76 1.06 6.6 0 .23-.13.53-.05.67.2.14.23.06.54-.18.67zm.2-2.8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5.7-2.13c-.38-1.16-1.2-2.2-2.3-3.05.38-.5.97-.82 1.6-.82 1.1 0 2 .9 2 2 0 .84-.53 1.57-1.3 1.87z" />
            </svg>
          </SharingButtonIcon>
          Share on Reddit
        </SharingButtonIconWrapper>
      </StyledSharingLink>
    </Fragment>
  );
};

ShareComponent.propTypes = {
  fundedAmount: T.number.isRequired,
  issueId: T.string.isRequired,
};

export default ShareComponent;
