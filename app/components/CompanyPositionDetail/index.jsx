import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import DOMPurify from 'dompurify';
import isEmpty from 'lodash/isEmpty';
import marked from 'marked';

import { ConditionalRender, LanguageWrapper } from 'components/base_ui';

import {
  ContentContainer,
  ContentLabel,
  ContentLabelWrapper,
  Description,
  HeaderWrapper,
  HorizontalDivider,
  Label,
  LabelValueGroup,
  LabelValueWrapper,
  LocationWrapper,
  Logo,
  Name,
  NameWrapper,
  PositionDetailContainer,
  PositionDetailContent,
  PositionDetailHeader,
  StyledPrimaryButton,
  StyledStep,
  StyledStepLabel,
  StyledStepper,
  Value,
} from './styledComponents';

const CompanyPositionDetail = ({
  company,
  dispatchOpenModal,
  isCompany,
  isSignedIn,
  position,
  surveyComplete,
}) => {
  const [modalState, setModalState] = useState('');
  const { logo, name, size, website } = company;
  const { formattedAddress } = company.location || {};
  const {
    description,
    experience,
    hasApplied,
    interviewProcess,
    location,
    role,
    salary,
    skills,
    timezone,
    title,
    type,
  } = position;
  const { formattedAddress: positionFormattedAddress } = location || {};
  const formattedInterviewProcess = interviewProcess || [];

  const html = marked(description);
  const cleanHtml = DOMPurify.sanitize(html);

  const buttonLabel = hasApplied ? 'Applied' : 'Apply';

  useEffect(() => {
    if (isSignedIn && surveyComplete) setModalState('apply');
    if (isSignedIn && !surveyComplete) setModalState('incomplete');
    if (!isSignedIn) setModalState('signin');
  }, []);

  return (
    <PositionDetailContainer>
      <PositionDetailHeader>
        <div>
          <HeaderWrapper>
            <ConditionalRender
              Component={<Logo src={logo} />}
              shouldRender={!!logo}
            />
            <NameWrapper>
              <Name>
                {name.toLowerCase()} - {title.toLowerCase()}
              </Name>
              <LocationWrapper shouldRemove>
                {positionFormattedAddress}, {timezone} &#9679; Remote
              </LocationWrapper>
            </NameWrapper>
          </HeaderWrapper>
          <LocationWrapper>
            {positionFormattedAddress}, {timezone} &#9679; Remote
          </LocationWrapper>
        </div>
        <ConditionalRender
          Component={
            <StyledPrimaryButton
              disabled={hasApplied}
              label={buttonLabel}
              onClick={() => dispatchOpenModal({ modalState })}
            />
          }
          shouldRender={!isCompany}
        />
      </PositionDetailHeader>
      <PositionDetailContent $isFirst>
        <ContentLabelWrapper>
          <ContentLabel>Company</ContentLabel>
        </ContentLabelWrapper>
        <HorizontalDivider />
        <ContentContainer hasBackground>
          <LabelValueWrapper hasMarginBottom width="100%">
            <Label>About the company</Label>
            <Value>{company.description}</Value>
          </LabelValueWrapper>
          <LabelValueGroup>
            <LabelValueWrapper>
              <Label>Location</Label>
              <Value allowWrap>{formattedAddress}</Value>
            </LabelValueWrapper>
            <LabelValueWrapper>
              <Label>Size</Label>
              <Value>{size}</Value>
            </LabelValueWrapper>
            <LabelValueWrapper>
              <Label>Website</Label>
              <Value>
                <a href={website}>{website}</a>
              </Value>
            </LabelValueWrapper>
          </LabelValueGroup>
        </ContentContainer>
      </PositionDetailContent>
      <PositionDetailContent>
        <ContentLabelWrapper>
          <ContentLabel>Position</ContentLabel>
        </ContentLabelWrapper>
        <HorizontalDivider />
        <ContentContainer>
          <LabelValueGroup>
            <LabelValueWrapper width="48%">
              <Label>Experience</Label>
              <Value>{experience}</Value>
            </LabelValueWrapper>
            <LabelValueWrapper width="48%">
              <Label>Role</Label>
              <Value allowWrap>{role.join(', ')}</Value>
            </LabelValueWrapper>
            <LabelValueWrapper width="48%">
              <Label>Salary</Label>
              <Value>{salary}</Value>
            </LabelValueWrapper>
            <LabelValueWrapper width="48%">
              <Label>Type</Label>
              <Value>{type}</Value>
            </LabelValueWrapper>
          </LabelValueGroup>
        </ContentContainer>
      </PositionDetailContent>
      <PositionDetailContent>
        <ContentLabelWrapper>
          <ContentLabel>Skills</ContentLabel>
        </ContentLabelWrapper>
        <HorizontalDivider />
        <ContentContainer>
          {skills.map(({ skill }) => (
            <LanguageWrapper key={`skill-${skill}`} language={skill} />
          ))}
        </ContentContainer>
      </PositionDetailContent>
      <ConditionalRender
        Component={
          <PositionDetailContent>
            <ContentLabelWrapper>
              <ContentLabel>Interview process</ContentLabel>
            </ContentLabelWrapper>
            <HorizontalDivider />
            <ContentContainer>
              <StyledStepper alternativeLabel>
                {formattedInterviewProcess.map(label => (
                  <StyledStep key={label}>
                    <StyledStepLabel>{label}</StyledStepLabel>
                  </StyledStep>
                ))}
              </StyledStepper>
            </ContentContainer>
          </PositionDetailContent>
        }
        shouldRender={!isEmpty(formattedInterviewProcess)}
      />
      <PositionDetailContent>
        <ContentLabelWrapper>
          <ContentLabel>Position description</ContentLabel>
        </ContentLabelWrapper>
        <HorizontalDivider />
        <ContentContainer>
          <Description dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        </ContentContainer>
      </PositionDetailContent>
    </PositionDetailContainer>
  );
};

CompanyPositionDetail.propTypes = {
  company: T.object.isRequired,
  dispatchOpenModal: T.func.isRequired,
  isCompany: T.bool.isRequired,
  isSignedIn: T.bool.isRequired,
  position: T.object.isRequired,
  surveyComplete: T.bool.isRequired,
};

export default CompanyPositionDetail;
