import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth.service';

function Header() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isEmployee = userRole === 'EMPLOYEE';
  const isStudent = userRole === 'STUDENT';

  return (
    <header className="d-flex flex-wrap justify-content-between align-items-center py-3 mb-4 border-bottom">
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#000000" viewBox="0 0 256 256">
          <path
            d="M232,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64ZM160,88h40a8,8,0,0,1,0,16H160a8,8,0,0,1,0-16Zm48,40a8,8,0,0,1-8,8H160a8,8,0,0,1,0-16h40A8,8,0,0,1,208,128Zm0,32a8,8,0,0,1-8,8H160a8,8,0,0,1,0-16h40A8,8,0,0,1,208,160Z">
          </path>
        </svg>
        <span className="fs-4">Biblioteca Desânima</span>
      </Link>

      <ul className="nav nav-pills" id="nav-menu">
        {(isStudent || isEmployee) && (
          <li className="nav-item">
            <Link to={isStudent ? "/pages/student/home/" : "/pages/employee/borrow/"} className="nav-link">Home</Link>
          </li>
        )}
        
        {(isStudent || isEmployee) && (
          <li className="nav-item">
            <Link to="/pages/employee/book/" className="nav-link">Livros</Link>
          </li>
        )}

        {isEmployee && (
          <>
            <li className="nav-item">
              <Link to="/pages/employee/student/" className="nav-link">Alunos</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">Funcionários</Link>
            </li>
          </>
        )}
      </ul>

      <div className="dropdown text-end ms-3">
        <a className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
          </svg>
        </a>
        <ul className="dropdown-menu text-small">
          <li>
            <button onClick={handleLogout} className="dropdown-item">Sair</button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;