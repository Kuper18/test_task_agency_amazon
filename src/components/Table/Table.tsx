import React, { useRef, useState } from 'react';
import {
  useNavigate,
  useLocation,
  useSearchParams,
  Link,
} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { CommonProperties } from '../../types/CommonProperties';
import { Paginate } from '../Paginate/Paginate';
import { ITEMS_PER_PAGE } from '../../utils/itemsPerPage';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  data: CommonProperties[];
};

type Params = {
  query: string;
  pathname: string;
  order: string;
  sort: string;
};

function checkQuery(values: string[], query: string) {
  return values.some((value) => value.toString().includes(query));
}

function filterData(data: CommonProperties[], params: Params) {
  let filteredData = data;
  const {
    query, pathname, sort, order,
  } = params;
  const path = pathname.split('/').filter((x) => x);
  const [category, itemId] = path;
  const normalizeQuery = query.toLowerCase().trim();

  if (normalizeQuery) {
    filteredData = filteredData
      .filter((dataItem) => checkQuery(
        Object.values(dataItem), normalizeQuery,
      ));
  }

  if (itemId) {
    switch (category) {
      case 'profiles':
        filteredData = filteredData
          .filter((dataItem) => dataItem.accountId === +itemId);
        break;

      case 'campaigns':
        filteredData = filteredData
          .filter((dataItem) => dataItem.profileId === +itemId);
        break;

      default:
        break;
    }
  }

  if (sort) {
    switch (sort) {
      case 'email':
      case 'authToken':
      case 'creationDate':
      case 'country':
      case 'marketplace':
      case 'date':
        filteredData = filteredData
          .sort(
            (dataA, dataB) => (dataA[sort] || '')
              .localeCompare((dataB[sort] || '')),
          );
        break;

      case 'clicks':
      case 'cost':
      case 'profileId':
      case 'accountId':
        filteredData = filteredData
          .sort((dataA, dataB) => (dataA[sort] || 0) - (dataB[sort] || 0));
        break;

      default:
        break;
    }
  }

  if (order) {
    filteredData.reverse();
  }

  return filteredData;
}

function getCurrentPage(url: string) {
  const pageValue = url
    .split('&')
    .filter((item) => item.includes('page'))
    .join('');

  return +[...pageValue.split('=')][1] || 1;
}

export const TableData: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const keys = useRef<string[]>([]);

  const [currentPage, setCurrentPage] = useState(getCurrentPage(search));
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredData = filterData([...data], {
    query,
    pathname,
    order,
    sort,
  });

  const indexOfLastItem = filteredData.length <= ITEMS_PER_PAGE
    ? ITEMS_PER_PAGE
    : currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = filteredData.length <= ITEMS_PER_PAGE
    ? 0
    : indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (id: number) => {
    const path = pathname.split('/').filter((x) => x);

    if (!path.length) {
      navigate(`/profiles/${id}`);
    }

    if (path.includes('profiles')) {
      navigate(`/campaigns/${id}`);
    }
  };

  const setUrlName = (columnName: string) => {
    if (sort !== columnName) {
      return { sort: columnName, order: null };
    }

    if (!order) {
      return { sort: columnName, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const setClass = (title: string) => {
    switch (true) {
      case sort === title && !order:
        return 'fa-solid fa-sort-up';

      case sort === title && !!order:
        return 'fa-solid fa-sort-down';

      default:
        return 'fa-solid fa-sort';
    }
  };

  if (currentItems.length > 0 && !keys.current.length) {
    keys.current = Object.keys(currentItems[0]).filter((key) => key !== 'id');
  }

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            {keys.current.map((title) => {
              return (
                <th key={title}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span>
                      {title === 'id' ? '#' : title}
                    </span>
                    <Link to={{
                      search: getSearchWith(searchParams, setUrlName(title)),
                    }}
                    >
                      <i className={setClass(title)} />
                    </Link>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => {
            const {
              id,
              accountId,
              profileId,
              email,
              authToken,
              creationDate,
              country,
              marketplace,
              clicks,
              cost,
              date,
            } = item;

            return (
              <tr
                key={id}
                onClick={() => handleClick(id)}
                style={{ cursor: 'pointer' }}
              >
                {accountId && <td>{accountId}</td>}
                {profileId && <td>{profileId}</td>}
                {email && <td>{email}</td>}
                {authToken && <td>{authToken}</td>}
                {creationDate && <td>{creationDate}</td>}
                {country && <td>{country}</td>}
                {marketplace && <td>{marketplace}</td>}
                {clicks && <td>{clicks}</td>}
                {cost && <td>{cost}</td>}
                {date && <td>{date}</td>}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Paginate
        data={filteredData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
