/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import {
  ConditionalRender,
  IconButton,
  ImageLinkWrapper,
} from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import { getNumOfTablesToRender } from './helpers';
import {
  IconWrapper,
  ListContainer,
  ListDetail,
  ListItemWrapper,
  NumberWrapper,
  StyledCoin,
  StyledTitle,
  StyledTitleLink,
  TitleWrapper,
  Username,
  ValueWrapper,
} from './styledComponents';

const beforeIcon = iconDictionary('navigateBefore');
const nextIcon = iconDictionary('navigateNext');

const StatsTableComponent = ({
  currIndex,
  isOverview,
  numberOfTables,
  setCurrIndex,
  shouldRenderOneTable,
  tableData,
  tableLength,
  title,
}) => (
  <ListContainer
    isOverview={isOverview}
    numberOfTables={numberOfTables}
    shouldRenderOneTable={shouldRenderOneTable}
  >
    <TitleWrapper>
      <ConditionalRender
        Component={
          <IconWrapper>
            <IconButton
              icon={beforeIcon}
              label="Previous"
              onClick={() => setCurrIndex(currIndex - 1)}
            />
          </IconWrapper>
        }
        FallbackComponent={<IconWrapper />}
        shouldRender={currIndex !== 0 && shouldRenderOneTable}
      />
      <ConditionalRender
        Component={<StyledTitleLink to="/stats">{title}</StyledTitleLink>}
        FallbackComponent={<StyledTitle>{title}</StyledTitle>}
        shouldRender={isOverview}
      />
      <ConditionalRender
        Component={
          <IconWrapper>
            <IconButton
              icon={nextIcon}
              label="Next"
              onClick={() => setCurrIndex(currIndex + 1)}
            />
          </IconWrapper>
        }
        FallbackComponent={<IconWrapper />}
        shouldRender={currIndex !== tableLength - 1 && shouldRenderOneTable}
      />
    </TitleWrapper>
    {tableData.map(
      (
        { dollarsEarned, fundedValue, id, profilePic, rep, username },
        index,
      ) => {
        let value = '';
        const hasDollarsEarned = dollarsEarned !== undefined;
        const hasFundedValue = fundedValue !== undefined;
        const hasCoins = rep !== undefined;
        if (hasDollarsEarned) {
          value = formatDollarAmount(dollarsEarned);
        } else if (hasFundedValue) {
          value = formatDollarAmount(fundedValue);
        } else {
          value = rep;
        }
        return (
          <ListItemWrapper key={`list-item-${id}`}>
            <ListDetail>
              <NumberWrapper>#{index + 1}</NumberWrapper>
              <ImageLinkWrapper
                alt={username}
                image={profilePic}
                route={`/users/detail/${id}`}
                size="3.5rem"
              />
              <Username to={`/users/detail/${id}`}>{username}</Username>
            </ListDetail>
            <ValueWrapper>
              {value} {hasCoins && <StyledCoin />}
            </ValueWrapper>
          </ListItemWrapper>
        );
      },
    )}
  </ListContainer>
);

const StatsTable = ({
  deviceView,
  isOverview,
  mostContribution,
  mostEarned,
  mostRep,
}) => {
  const [currIndex, setCurrIndex] = useState(0);
  const isTablet =
    deviceView === 'mobileXXS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobile' ||
    deviceView === 'tablet';
  const isLaptop =
    isTablet || deviceView === 'laptopS' || deviceView === 'laptop';
  const tableProps = [
    { tableData: mostEarned, title: 'Highest Earning' },
    { tableData: mostRep, title: 'Most Coins' },
    { tableData: mostContribution, title: 'Top Donors' },
  ];
  const numberOfTables = getNumOfTablesToRender(tableProps);
  const shouldRenderOneTable =
    (isTablet && numberOfTables === 2) ||
    (isLaptop && numberOfTables === 3) ||
    isOverview;

  const MultipeTableComponent = () =>
    tableProps.map(({ tableData, title }, index) => {
      if (!isEmpty(tableData)) {
        return (
          <StatsTableComponent
            key={`table=${index}`}
            isOverview={isOverview}
            numberOfTables={numberOfTables}
            shouldRenderOneTable={shouldRenderOneTable}
            tableData={tableData}
            tableLength={tableProps.length}
            title={title}
          />
        );
      }
      return null;
    });
  const OneTableComponent = () => {
    const tempTableProps = tableProps.filter(
      ({ tableData }) => !isEmpty(tableData),
    );
    const { tableData, title } = tempTableProps[currIndex] || {};
    return (
      <StatsTableComponent
        currIndex={currIndex}
        isOverview={isOverview}
        numberOfTables={numberOfTables}
        setCurrIndex={setCurrIndex}
        shouldRenderOneTable={shouldRenderOneTable}
        tableData={tableData}
        tableLength={tempTableProps.length}
        title={title}
      />
    );
  };

  return (
    <ConditionalRender
      Component={OneTableComponent}
      FallbackComponent={MultipeTableComponent}
      shouldRender={shouldRenderOneTable}
    />
  );
};

StatsTableComponent.defaultProps = {
  tableData: [],
  title: '',
};

StatsTableComponent.propTypes = {
  currIndex: T.number,
  isOverview: T.bool.isRequired,
  numberOfTables: T.number.isRequired,
  setCurrIndex: T.func,
  shouldRenderOneTable: T.bool.isRequired,
  tableData: T.array,
  tableLength: T.number.isRequired,
  title: T.string,
};

StatsTable.propTypes = {
  deviceView: T.string.isRequired,
  isOverview: T.bool.isRequired,
  mostContribution: T.array.isRequired,
  mostEarned: T.array.isRequired,
  mostRep: T.array.isRequired,
};

export default StatsTable;
