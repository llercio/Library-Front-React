import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import Logo from '../Logo/Logo';
function LoginForm() {

  return (
    <main className={`w-100 m-auto ${styles.formContainer}`}>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>

        <div className={`text-center mb-4 ${styles.textCenter}`}>
          <Logo />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

      </form>
    </main>
  );
}

export default LoginForm;