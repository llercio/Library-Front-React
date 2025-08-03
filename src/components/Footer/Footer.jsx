import React from 'react';

function Footer() {
  return (
    <footer className="container mt-auto">
      <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-body-secondary">&copy; 2025 Biblioteca Desânima</span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3"><a className="text-body-secondary" href="#"><i className="fab fa-instagram"></i></a></li>
          <li className="ms-3"><a className="text-body-secondary" href="#"><i className="fab fa-facebook"></i></a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;