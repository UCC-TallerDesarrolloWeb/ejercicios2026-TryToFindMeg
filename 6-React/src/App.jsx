import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Activities from './Activities.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/actividades" element={<Activities />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
