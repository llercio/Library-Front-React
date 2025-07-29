import React, { useState } from 'react';
import styles from './LoginForm.module.css';


const baseUrl = 'SUA_URL_BASE_DA_API';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Email:', { email, pass: password });

    try {
      const response = await fetch(`${baseUrl}/credentials/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email: email, pass: password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);

        if (data.role === 'STUDENT') {
          window.location.href = '/pages/student/home';
        } else if (data.role === 'EMPLOYEE') {
          window.location.href = '/pages/employee/borrow';
        } else {
          alert('Função de usuário desconhecida.');
        }
      } else {
        alert('Falha no login: ' + (data.message || 'Credenciais inválidas.'));
      }
      console.log('Login response:', data);

    } catch (error) {
      console.error('Erro durante o login:', error);
      alert('Erro ao tentar fazer login. Por favor, verifique sua conexão ou tente novamente.');
    }
  };

  return (
    <main className={`w-100 m-auto ${styles.formContainer}`}>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div className={`text-center ${styles.textCenter}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#000000" viewBox="0 0 256 256">
            <path
              d="M232,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64ZM160,88h40a8,8,0,0,1,0,16H160a8,8,0,0,1,0-16Zm48,40a8,8,0,0,1-8,8H160a8,8,0,0,1,0-16h40A8,8,0,0,1,208,128Zm0,32a8,8,0,0,1-8,8H160a8,8,0,0,1,0-16h40A8,8,0,0,1,208,160Z">
            </path>
          </svg>
        </div>

        <h1 className={`h3 mb-3 fw-bold ${styles.heading}`}>Bibioteca Desânima</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="emailInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="emailInput">E-mail</label>
        </div>
        <br />
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="passwordInput">Senha</label>
        </div>

        <button
          type="submit"
          className="btn mt-4 btn-primary w-100 py-2"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default LoginForm;