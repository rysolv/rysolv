import React from 'react';
import T from 'prop-types';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Filter from 'components/Filter';
import SideNav from 'components/SideNav';
import autocompleteDictionary from 'utils/autocompleteDictionary';
import { overviewDirectory } from './helpers';

import {
  ComponentContainer,
  ContentContainer,
  FilterContainer,
  OverviewContainer,
  OverviewHeader,
} from './styledComponents';

const Overview = props => {
  const {
    match: { path },
    handleNav,
  } = props;
  const { Component, title, initialValue } = overviewDirectory(path);

  document.title = 'Rysolv';
  return (
    <OverviewContainer>
      <SideNav initialValue={initialValue} handleNav={handleNav} />
      <OverviewHeader>{title}</OverviewHeader>
      <ContentContainer>
        <ComponentContainer>
          <Component />
        </ComponentContainer>

        <FilterContainer>
          <Filter languageOptions={autocompleteDictionary.language} />
        </FilterContainer>
      </ContentContainer>
    </OverviewContainer>
  );
};

Overview.propTypes = {
  handleNav: T.func,
  match: T.object,
};

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Overview);
