import React, { useEffect } from 'react';
import T from 'prop-types';

import { PrimaryButton } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  Button,
  ButtonGroup,
  ButtonWrapper,
  CodeInput,
  CodeWrapper,
  EmbedIssueContainer,
  LogoWrapper,
  StyledSecondaryButton,
  StyledTitle,
} from './styledComponents';

const CoinIcon = iconDictionary('coin', 'medium');

const EmbedIssueModal = ({ deviceView, handleClose, issueId }) => {
  useEffect(() => {
    const e = document.getElementById('button-code');
    e.style.height = `${e.scrollHeight}px`;
  }, [deviceView]);

  const handleCopy = () => {
    const copyText = document.getElementById('button-code');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
  };
  return (
    <EmbedIssueContainer>
      <StyledTitle>Get Funding!</StyledTitle>
      <span>
        Want to get funding for this issue? Copy and paste this markdown into
        your issue on Github.
      </span>
      <ButtonWrapper>
        <Button>
          <LogoWrapper>{CoinIcon}</LogoWrapper>
          <span>Fund Issue on Rysolv</span>
        </Button>
      </ButtonWrapper>
      <CodeWrapper>
        <CodeInput
          id="button-code"
          readOnly
          value={`<a href="https://rysolv.com/issues/detail/${issueId}"><img width="200px" src="https://rysolv.s3.us-east-2.amazonaws.com/FundingButton.png"></a>`}
        />
      </CodeWrapper>
      <ButtonGroup>
        <StyledSecondaryButton label="Close" onClick={handleClose} />
        <PrimaryButton label="Copy Markdown" onClick={handleCopy} />
      </ButtonGroup>
    </EmbedIssueContainer>
  );
};

EmbedIssueModal.propTypes = {
  deviceView: T.string.isRequired,
  handleClose: T.func.isRequired,
  issueId: T.string.isRequired,
};

export default EmbedIssueModal;
