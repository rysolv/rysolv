import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { Card, PrimaryAsyncButton } from 'components/base_ui';
import { issueTags, tagColors } from 'components/Issues/constants';
import VerifyForm from 'components/Issues/Add/Verify';

import {
  clearForm,
  generateIdenticon,
  incrementStep,
  saveInfo,
} from '../actions';
import { makeSelectIssues, makeSelectIssuesRequestBody } from '../selectors';
import {
  BackLink,
  ButtonGroup,
  LanguageContainer,
  LogoWrapper,
  OrganizationName,
  OrganizationNameWrapper,
  StyledFocusDiv,
  StyledFormHelperText,
  StyledH3,
  StyledLanguageWrapper,
  StyledLink,
  StyledTagWrapper,
  Tag,
  TagContainer,
} from './styledComponents';

const VerifyIssue = ({
  dispatchClearForm,
  dispatchIncrementStep,
  dispatchSaveInfo,
  handleGenerateIdenticon,
  importSuccess,
  issueData,
  issueData: { issueLanguages },
  organizationData: { organizationLogo, organizationName, organizationRepo },
  requestBody,
}) => {
  const [selectedType, setSelectedType] = useState('');
  const [typeError, setTypeError] = useState('');

  useEffect(() => {
    if (!organizationLogo.value) handleGenerateIdenticon();
    document.getElementById('issueAdd').focus();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    requestBody.issueType = selectedType;
  }, [selectedType]);

  const cancelImport = () => {
    dispatchClearForm();
    dispatchIncrementStep({ step: 1, view: 'addIssue' });
  };
  const handleKeypress = ({ key }) => {
    if (key === 'Enter') {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    if (!selectedType) {
      setTypeError('One issue type needs to be selected.');
    } else {
      setTypeError('');
      dispatchSaveInfo({ requestBody });
    }
  };

  const mapLanguages = array => {
    if (array.value.length > 0) {
      return array.value.map(el => (
        <StyledLanguageWrapper key={el} language={el} />
      ));
    }
    return 'None listed.';
  };

  const languageDiv = mapLanguages(issueLanguages);

  const tagDiv = issueTags.map((el, idx) => {
    const isTagSelected = el === selectedType;

    const handleSelectType = () => {
      setSelectedType(el);
      setTypeError('');
    };
    return (
      <StyledTagWrapper
        key={el}
        isTagSelected={isTagSelected}
        onClick={handleSelectType}
        tagColor={tagColors[idx]}
      >
        {el}
      </StyledTagWrapper>
    );
  });

  return (
    <StyledFocusDiv
      id="issueAdd"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <StyledH3 isFirstHeader>Organization</StyledH3>
      <Card>
        <LogoWrapper
          alt={organizationName.value}
          src={organizationLogo.value}
        />
        <OrganizationNameWrapper>
          <OrganizationName>{organizationName.value}</OrganizationName>
          <StyledLink href={organizationRepo.value} target="_blank">
            {organizationRepo.value}
          </StyledLink>
        </OrganizationNameWrapper>
      </Card>
      <StyledH3>Issue</StyledH3>
      <Card>
        <VerifyForm
          issueData={issueData}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          setTypeError={setTypeError}
          typeError={typeError}
        />
      </Card>
      <StyledH3>Languages</StyledH3>
      <Card>
        <LanguageContainer>{languageDiv}</LanguageContainer>
      </Card>
      <StyledH3>Select a tag</StyledH3>
      <Card>
        <TagContainer>
          <Tag>{tagDiv}</Tag>
          <StyledFormHelperText error={!!typeError}>
            {typeError}
          </StyledFormHelperText>
        </TagContainer>
      </Card>
      <ButtonGroup>
        {importSuccess ? (
          <BackLink onClick={() => cancelImport()}>Cancel</BackLink>
        ) : (
          <BackLink
            onClick={() => dispatchIncrementStep({ step: 3, view: 'addIssue' })}
          >
            Edit Issue
          </BackLink>
        )}

        <PrimaryAsyncButton
          disabled={false}
          label="Submit"
          onClick={handleSubmit}
        />
      </ButtonGroup>
    </StyledFocusDiv>
  );
};

VerifyIssue.propTypes = {
  dispatchClearForm: T.func,
  dispatchIncrementStep: T.func,
  dispatchSaveInfo: T.func,
  handleGenerateIdenticon: T.func,
  importSuccess: T.bool,
  issueData: T.object,
  organizationData: T.object,
  requestBody: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  issueData: makeSelectIssues('issueData'),
  organizationData: makeSelectIssues('organizationData'),
  requestBody: makeSelectIssuesRequestBody(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchClearForm: () => dispatch(clearForm()),
    dispatchIncrementStep: payload => dispatch(incrementStep(payload)),
    dispatchSaveInfo: payload => dispatch(saveInfo(payload)),
    handleGenerateIdenticon: () => dispatch(generateIdenticon()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyIssue);
