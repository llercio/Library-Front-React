import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import './App.css';

// Componentes de página simulados (você irá substituí-los)
function StudentHomePage() { return <h1>Página Inicial do Aluno</h1>; }
function EmployeeHomePage() { return <h1>Página Inicial do Funcionário</h1>; }
function BookPage() { return <h1>Página de Livros</h1>; }
function StudentPage() { return <h1>Página de Alunos</h1>; }
function EmployeePage() { return <h1>Página de Funcionários</h1>; }

function App() {
  const isUserLoggedIn = localStorage.getItem('token'); 
  const userRole = localStorage.getItem('userRole');

  return (
    <div className="d-flex align-items-center justify-content-center px-3 py-4 py-md-5 bg-body-tertiary min-vh-100">
      {isUserLoggedIn && <Header />}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        
        <Route path="/pages/employee/book/" element={<BookPage />} />

        {userRole === 'STUDENT' && (
          <Route path="/pages/student/home/" element={<StudentHomePage />} />
        )}

        {userRole === 'EMPLOYEE' && (
          <>
            <Route path="/pages/employee/borrow/" element={<EmployeeHomePage />} />
            <Route path="/pages/employee/student/" element={<StudentPage />} />
            <Route path="/pages/employee/employee/" element={<EmployeePage />} />
          </>
        )}

        <Route path="*" element={<h1>Página Não Encontrada ou Acesso Não Autorizado</h1>} />
      </Routes>
    </div>
  );
}

export default App;