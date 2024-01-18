import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { TableData } from '../../components/Table/Table';
import { getAccounts } from '../../utils/fetchClient';
import { AccountsType } from '../../types/accounts';
import { FormInput } from '../../components/FormInput/FormInput';

export const Accounts = () => {
  const [accounts, setAccounts] = useState<AccountsType[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoad(true);
    getAccounts()
      .then((data) => setAccounts(data))
      .catch(error => {
        setErrorMessage('Something went wrong');
        throw error;
      })
      .finally(() => setIsLoad(false));
  }, []);

  if (isLoad) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ width: '100%' }}
      >
        <h1>Accounts</h1>
        <FormInput />
      </div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <TableData data={accounts} />
      )}
    </>
  );
};
