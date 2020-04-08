import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { BaseContainer } from 'components/base_ui';
import AdminHeader from 'components/Admin/AdminHeader';
import { typeDictionary } from './constants';

export const Admin = ({
  handleNav,
  match,
  match: {
    params: { subroute, view, id },
  },
}) => {
  const Component = typeDictionary[subroute];
  return (
    <Fragment key={subroute}>
      <BaseContainer>
        <AdminHeader activePage={subroute} handleNav={handleNav} />
        <Component subroute={subroute} view={view} id={id} match={match} />
      </BaseContainer>
    </Fragment>
  );
};

Admin.propTypes = {
  handleNav: T.func,
  match: T.object,
};

const mapDispatchToProps = dispatch => ({
  handleNav: ({ subroute }) => {
    dispatch(push(`/${subroute}`));
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Admin);
