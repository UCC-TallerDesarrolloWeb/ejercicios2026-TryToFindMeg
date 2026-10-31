import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Activities from './Activities.jsx';

function App() {
  const [isLogin, setIsLogin] = useState(
    () => localStorage.getItem('isLogin') === 'true',
  );

  useEffect(() => {
    if (isLogin) {
      localStorage.setItem('isLogin', 'true');
    } else {
      localStorage.removeItem('isLogin');
    }
  }, [isLogin]);

  return (
    <Routes>
      <Route path="/" element={
        <Layout
          isLogin={isLogin}
          onLogin={() => setIsLogin(true)}
          onLogout={() => setIsLogin(false)}
        />
      }>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="actividades" element={<Activities />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
