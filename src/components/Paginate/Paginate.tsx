import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import { CommonProperties } from '../../types/CommonProperties';
import { ITEMS_PER_PAGE } from '../../utils/itemsPerPage';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  data: CommonProperties[];
  setCurrentPage: (value: number) => void;
  currentPage: number;
};

export const Paginate: React.FC<Props> = ({
  data,
  setCurrentPage,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginate = (pageNumber: number) => {
    const newParams = getSearchWith(searchParams, { page: pageNumber || null });

    setSearchParams(newParams);
    setCurrentPage(pageNumber);
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => paginate(1)} />
      <Pagination.Prev
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {Array.from(
        { length: Math.ceil(data.length / ITEMS_PER_PAGE) },
        (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ),
      )}
      <Pagination.Next
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === Math.ceil(data.length / ITEMS_PER_PAGE)}
      />
      <Pagination.Last
        onClick={() => paginate(Math.ceil(data.length / ITEMS_PER_PAGE))}
      />
    </Pagination>
  );
};
