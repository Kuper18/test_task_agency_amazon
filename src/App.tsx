import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import './App.scss';

export const App = () => {
  return (
    <>
      <Header />
      <Container>
        <main className="main">
          <Outlet />
        </main>
      </Container>
      <Footer />
    </>
  );
};
