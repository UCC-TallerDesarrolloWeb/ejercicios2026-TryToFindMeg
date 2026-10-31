import { NavLink } from 'react-router-dom';

function Header({ isLogin, onLogout }) {
  return (
    <header className="site-header">
      <div className="header-content">
        <p className="site-title">Gimnasio</p>
        <nav aria-label="Navegación principal">
          <NavLink to="/" end>Home</NavLink>
          {isLogin ? (
            <button type="button" onClick={onLogout}>Logout</button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
          <NavLink to="/actividades">Actividades</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
