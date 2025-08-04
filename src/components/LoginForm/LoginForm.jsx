import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { login } from '../../services/auth.service';
import Logo from '../Logo/Logo'; // Usando o componente de Logo

function LoginForm() {
  // --- Mantendo o estado 'email' ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      // --- Passando 'email' para a função de login ---
      const data = await login(email, password);
      
      if (data.token && data.role) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);

        if (data.role === 'STUDENT') {
          navigate('/pages/student/home/');
        } else if (data.role === 'EMPLOYEE') {
          navigate('/pages/employee/borrow/');
        } else {
          setError('Função de usuário desconhecida.');
          localStorage.clear();
        }
      } else {
        setError('Resposta de login incompleta do servidor.');
      }
    } catch (err) {
      setError(err.message || 'Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`w-100 m-auto ${styles.formContainer}`}>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>

        <div className={`text-center mb-4 ${styles.textCenter}`}>
          <Logo />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* --- Campo de E-mail --- */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="emailInput"
            placeholder="nome@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="emailInput">E-mail</label>
        </div>

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
          className="w-100 btn btn-lg btn-primary mt-4"
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </button>

      </form>
    </main>
  );
}

export default LoginForm;