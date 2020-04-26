import React, { Fragment, useEffect } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import AdminHeader from 'components/Admin/AdminHeader';
import { BaseContainer, ConditionalRender } from 'components/base_ui';
import Sidebar from 'components/Sidebar';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { fetchActiveUser } from './actions';
import { typeDictionary } from './helpers';
import NotFoundPage from '../NotFoundPage/Loadable';
import saga from './saga';
import reducer from './reducer';
import { subrouteDictionary, viewDictionary } from './routeDictionary';

export const Admin = ({
  handleNav,
  match,
  dispatchFetchActiveUser,
  match: {
    params: { subroute, view, id },
  },
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const userArray = [
      '517fa5c9-1d6e-4925-8bcc-25c24cd0b95d',
      'b519b064-b5db-4472-ad1b-00e30bdbfa4c',
      'c2209ded-9219-4ee3-9c29-f863889053c0',
      'cdd583cf-4711-4f33-a202-c937081afd7e',
      '3f6e3ddf-ab68-4ee3-bb79-abfe21c8d014',
    ];
    const rand = Math.floor(Math.random() * Math.floor(5));

    dispatchFetchActiveUser({ userId: userArray[rand] });
  }, []);
  let routesMatch = false;
  const Component = typeDictionary[subroute];

  if (subroute && !view && subrouteDictionary.includes(subroute)) {
    routesMatch = true;
  }
  if (
    subroute &&
    subrouteDictionary.includes(subroute) &&
    view &&
    viewDictionary.includes(view)
  ) {
    routesMatch = true;
  }

  const ComponentToRender = (
    <Fragment key={subroute}>
      <BaseContainer>
        <AdminHeader activePage={subroute} handleNav={handleNav} />
        <Component subroute={subroute} view={view} id={id} match={match} />
      </BaseContainer>
      <Sidebar />
    </Fragment>
  );
  return (
    <ConditionalRender
      Component={ComponentToRender}
      FallbackComponent={NotFoundPage}
      shouldRender={routesMatch}
    />
  );
};

Admin.propTypes = {
  dispatchFetchActiveUser: T.func,
  handleNav: T.func,
  match: T.object,
};

const mapDispatchToProps = dispatch => ({
  handleNav: ({ subroute }) => {
    dispatch(push(`/admin/${subroute}`));
  },
  dispatchFetchActiveUser: payload => dispatch(fetchActiveUser(payload)),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'admin', reducer });
const withSaga = injectSaga({ key: 'admin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Admin);
