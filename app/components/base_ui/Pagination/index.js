import React, { Fragment, useEffect, useState } from 'react';
import T from 'prop-types';

import {
  PaginationWrapper,
  Results,
  StyledPagination,
} from './styledComponents';

const Pagination = ({ Component, propsToPassDown }) => {
  const { data, ...restProps } = propsToPassDown;
  const perPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const { length } = data;
  const count = Math.ceil(length / perPage);
  const slice = data.slice(
    currentPage * perPage,
    currentPage * perPage + perPage,
  );
  return (
    <Fragment>
      <Component data={slice} {...restProps} />
      <PaginationWrapper>
        <StyledPagination
          count={count}
          shape="rounded"
          onChange={(e, value) => setCurrentPage(value - 1)}
        />
        <Results>
          {length} {length === 1 ? 'Result' : 'Results'}
        </Results>
      </PaginationWrapper>
    </Fragment>
  );
};

Pagination.propTypes = {
  Component: T.func.isRequired,
  propsToPassDown: T.object.isRequired,
};

export default Pagination;
