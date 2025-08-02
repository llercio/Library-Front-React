import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { login } from '../../services/auth.service';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const data = await login(email, password);
      
      if (data.token) {
        localStorage.setItem('token', data.token);

        if (data.role === 'STUDENT') {
          window.location.href = '/pages/student/home';
        } else if (data.role === 'EMPLOYEE') {
          window.location.href = '/pages/employee/borrow';
        } else {
          setError('Função de usuário desconhecida.');
          localStorage.removeItem('token');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`w-100 m-auto ${styles.formContainer}`}>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>

        <div className={`text-center ${styles.textCenter}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#000000" viewBox="0 0 256 256">
            <path d="M232,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64ZM160,88h40a8,8,0,0,1,0,16H160a8,8,0,0,1,0-16Zm48,40a8,8,0,0,1-8,8H160a8,8,0,0,1,0-16h40A8,8,0,0,1,208,128Zm0,32a8,8,0,0,1-8,8H160a8,8,0,0,1,0-16h40A8,8,0,0,1,208,160Z" />
          </svg>
        </div>

        <h1 className={`h3 mb-3 fw-bold ${styles.heading}`}>Bibioteca Desânima</h1>

        {error && <div className="alert alert-danger">{error}</div>}

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
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </button>

      </form>
    </main>
  );
}

export default LoginForm;