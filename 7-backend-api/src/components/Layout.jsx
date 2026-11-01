import { Outlet, useNavigate } from 'react-router-dom';
import Header from '@components/Header.jsx';
import Footer from '@components/Footer.jsx';
import '@styles/Layout.css';

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
