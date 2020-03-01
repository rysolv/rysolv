import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { BaseContainer } from 'components/base_ui';
import AdminHeader from 'components/Admin/AdminHeader';
import { typeDictionary } from './constants';
import { getAdminType, getMatchParams } from './selectors';

export const Admin = ({ handleNav, subroute, view }) => {
  const Component = typeDictionary[subroute];
  return (
    <Fragment key={subroute}>
      <BaseContainer>
        <AdminHeader activePage={subroute} handleNav={handleNav} />
        <Component subroute={subroute} view={view} />
      </BaseContainer>
    </Fragment>
  );
};

Admin.propTypes = {
  handleNav: T.func,
  subroute: T.string,
  view: T.string,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer: Admin
   */
  subroute: getAdminType(),
  view: getMatchParams('view'),
});

const mapDispatchToProps = dispatch => ({
  handleNav: ({ subroute }) => {
    dispatch(push(`/${subroute}`));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Admin);
