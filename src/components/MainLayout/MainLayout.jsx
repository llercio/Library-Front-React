import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-grow-1 d-flex align-items-center justify-content-center px-3 py-4 py-md-5">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;