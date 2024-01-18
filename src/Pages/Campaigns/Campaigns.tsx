import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { TableData } from '../../components/Table/Table';
import { getCampaigns } from '../../utils/fetchClient';
import { CampaignsTypes } from '../../types/campaigns';
import { FormInput } from '../../components/FormInput/FormInput';

export const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<CampaignsTypes[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoad(true);
    getCampaigns()
      .then((data) => setCampaigns(data))
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
        <h1>Campaigns</h1>
        <FormInput />
      </div>

      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <TableData data={campaigns} />
      )}
    </>
  );
};
