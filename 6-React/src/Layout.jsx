import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import './Layout.css';

function Layout({ isLogin, onLogin, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate('/');
  }

  return (
    <div className="site-layout">
      <Header isLogin={isLogin} onLogout={handleLogout} />
      <main className="site-main">
        <Outlet context={{ isLogin, onLogin }} />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
