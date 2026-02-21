import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Background } from './components/Background';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './components/Login';

function App() {
  return (
    <Router>
      <Background /> {/* Background persists across all routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login onClose={() => window.location.href = '/'} />} />
      </Routes>
    </Router>
  );
}

export default App;
