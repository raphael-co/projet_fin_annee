import logo from './logo.svg';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/PageNotFound'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
