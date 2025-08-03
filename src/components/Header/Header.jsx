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
    <header className="d-flex flex-wrap justify-content-between align-items-center py-3 mb-4 border-bottom container">
      <div className="me-md-auto">
        <Logo />
      </div>

      <ul className="nav nav-pills" id="nav-menu">
      </ul>

      <div className="dropdown text-end ms-3">
      </div>
    </header>
  );
}

export default Header;