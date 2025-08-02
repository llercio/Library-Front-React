const API_BASE_URL = 'https://library-a3-production.up.railway.app';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/credentials/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, pass: password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha na autenticação.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na chamada da API de login:', error);
    throw new Error('Erro de conexão. Verifique sua URL da API ou sua rede.');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};