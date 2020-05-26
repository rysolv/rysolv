import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { IconButton } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  IconButtonContainer,
  IconButtonWrapper,
  IssueAttempts,
  IssueContent,
  IssueContentInfo,
  IssueDetail,
  IssueFundedAmount,
  IssueListItem,
  IssueModifiedDate,
  IssueName,
  IssueNameWrapper,
  IssueOpen,
  IssueOpenWrapper,
  IssuesList,
} from './styledComponents';

const EditIcon = iconDictionary('edit');

const IssuesComponent = ({ handleNav, issues }) => (
  <IssuesList>
    {issues.map(
      ({ attempting, fundedAmount, id, modifiedDate, name, open }) => (
        <IssueListItem key={`list-item-${id}`}>
          <IconButtonContainer>
            <IconButtonWrapper>
              <IconButton
                icon={EditIcon}
                label="Edit"
                onClick={() => handleNav(`/issues/detail/${id}`)}
              />
            </IconButtonWrapper>
          </IconButtonContainer>
          <IssueContent>
            <IssueContentInfo>
              <IssueModifiedDate>
                {moment.utc(modifiedDate).fromNow()}
              </IssueModifiedDate>
              <IssueDetail>
                <IssueNameWrapper>
                  <IssueName onClick={() => handleNav(`/issues/detail/${id}`)}>
                    {name}
                  </IssueName>
                  <IssueOpenWrapper>
                    <IssueOpen open={open}>
                      {open ? 'Funded' : 'Unfunded'}
                    </IssueOpen>
                    <IssueAttempts>{attempting.length} Attempts</IssueAttempts>
                  </IssueOpenWrapper>
                </IssueNameWrapper>
                <IssueFundedAmount>
                  {formatDollarAmount(fundedAmount)}
                </IssueFundedAmount>
              </IssueDetail>
            </IssueContentInfo>
          </IssueContent>
        </IssueListItem>
      ),
    )}
  </IssuesList>
);

IssuesComponent.propTypes = {
  handleNav: T.func,
  issues: T.array,
};

export default IssuesComponent;
