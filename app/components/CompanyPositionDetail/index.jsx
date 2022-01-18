import React from 'react';
import T from 'prop-types';
import DOMPurify from 'dompurify';
import marked from 'marked';

import { ConditionalRender, LanguageWrapper } from 'components/base_ui';

import {
  ContentContainer,
  ContentLabel,
  ContentLabelWrapper,
  Description,
  HorizontalDivider,
  Label,
  LabelValueGroup,
  LabelValueWrapper,
  Logo,
  NameWrapper,
  PositionDetailContainer,
  PositionDetailContent,
  PositionDetailHeader,
  Value,
} from './styledComponents';

const CompanyPositionDetail = ({ company, position }) => {
  const { logo, name, size, website } = company;
  const { formattedAddress } = company.location || {};
  const {
    description,
    experience,
    location,
    role,
    salary,
    skills,
    timezone,
    title,
    type,
  } = position;
  const { formattedAddress: positionFormattedAddress } = location || {};

  const html = marked(description);
  const cleanHtml = DOMPurify.sanitize(html);

  return (
    <PositionDetailContainer>
      <PositionDetailHeader>
        <ConditionalRender
          Component={<Logo src={logo} />}
          shouldRender={!!logo}
        />
        <NameWrapper>
          {name} - {title}
        </NameWrapper>
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
        <ContentContainer hasBackground>
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
            <LabelValueWrapper width="48%">
              <Label>Position location</Label>
              <Value allowWrap>
                {positionFormattedAddress} <br />
                (Remote, {timezone})
              </Value>
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
  position: T.object.isRequired,
};

export default CompanyPositionDetail;
