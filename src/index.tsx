import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Accounts } from './Pages/Accounts/Accounts';
import { Profiles } from './Pages/Profiles/Profiles';
import { Campaigns } from './Pages/Campaigns/Campaigns';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Accounts />} />

        <Route path="profiles/:profileId?">
          <Route index element={<Profiles />} />
        </Route>

        <Route path="campaigns/:campaignsId?">
          <Route index element={<Campaigns />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>,
);
