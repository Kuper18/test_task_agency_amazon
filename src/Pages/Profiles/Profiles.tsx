/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { TableData } from '../../components/Table/Table';
import { getProfiles } from '../../utils/fetchClient';
import { ProfilesTypes } from '../../types/profiles';
import { FormInput } from '../../components/FormInput/FormInput';

export const Profiles = () => {
  const [profiles, setProfiles] = useState<ProfilesTypes[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoad(true);
    getProfiles()
      .then((data) => setProfiles(data))
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
        <h1>Profiles</h1>
        <FormInput />
      </div>

      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <TableData data={profiles} />
      )}
    </>
  );
};
