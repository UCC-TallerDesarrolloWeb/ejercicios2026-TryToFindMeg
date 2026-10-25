import { useState } from 'react';
import './styles/Login.scss';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  function handleLogin(event) {
    event.preventDefault();

    if (username === 'admin' && password === 'admin') {
      console.log('Login OK');
      setMensaje('Login OK');
    } else {
      console.log('Login Incorrecto');
      setMensaje('Login Incorrecto');
    }
  }

  return (
    <main className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Iniciar sesión</h1>

        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Usuario"
          autoComplete="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Ingresar</button>
        <p className="login-message" role="status">{mensaje}</p>
      </form>
    </main>
  );
}

export default Login;
