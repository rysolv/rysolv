import React, { Fragment, useEffect, useState } from 'react';
import T from 'prop-types';

import { Results, StyledPagination } from './styledComponents';

const Pagination = ({ Component, propsToPassDown }) => {
  const { data, ...restProps } = propsToPassDown;
  const perPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [data]);

  const { length } = data;
  const count = Math.ceil(length / perPage);
  const slice = data.slice(
    currentPage * perPage,
    currentPage * perPage + perPage,
  );
  return (
    <Fragment>
      <Results>
        {length} {length === 1 ? 'Result' : 'Results'}
      </Results>
      <Component data={slice} {...restProps} />
      <StyledPagination
        count={count}
        shape="rounded"
        onChange={(e, value) => setCurrentPage(value - 1)}
      />
    </Fragment>
  );
};

Pagination.propTypes = {
  Component: T.func.isRequired,
  propsToPassDown: T.object.isRequired,
};

export default Pagination;
