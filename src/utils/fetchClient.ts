import accountsFromServer from '../api/accounts.json';
import profilesFromServer from '../api/profiles.json';
import campaignsFromServer from '../api/campaigns.json';

function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export const getAccounts = async () => {
  await wait(500);

  return accountsFromServer;
};

export const getProfiles = async () => {
  await wait(500);

  return profilesFromServer;
};

export const getCampaigns = async () => {
  await wait(500);

  return campaignsFromServer;
};
