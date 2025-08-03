import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LoginForm from './components/LoginForm/LoginForm';

function StudentHomePage() { return <h1>Página Inicial do Aluno</h1>; }
function EmployeeHomePage() { return <h1>Página Inicial do Funcionário</h1>; }
function BookPage() { return <h1>Página de Livros</h1>; }
function StudentPage() { return <h1>Página de Alunos</h1>; }
function EmployeePage() { return <h1>Página de Funcionários</h1>; }

function App() {
  const isUserLoggedIn = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const homePath = userRole === 'STUDENT' ? '/pages/student/home' : '/pages/employee/borrow';

  return (
    <div className="d-flex flex-column bg-body-tertiary min-vh-100">
      <Routes>

        <Route path="/" element={isUserLoggedIn ? <Navigate to={homePath} /> : <LoginForm />} />

        <Route path="/home" element={<Navigate to={homePath} />} />
        
        <Route 
          path="/pages/student/home"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentHomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pages/employee/borrow"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <EmployeeHomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pages/employee/book"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE', 'STUDENT']}>
              <BookPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pages/employee/student"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <StudentPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pages/employee/employee"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <EmployeePage />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<h1>Página Não Encontrada</h1>} />
      </Routes>
    </div>
  );
}

export default App;