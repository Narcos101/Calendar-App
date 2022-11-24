import React from 'react';
import './App.css';
import DashBoard from './components/pages/DashBoard';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import LoginPage from './components/pages/LoginPage';
import { AuthProvider } from './components/context/AuthContext';
import PrivateRoute from './components/utils/PrivateRoute';
import RegisterPage from './components/pages/RegisterPage';
import Page404 from './components/pages/Page404';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <Routes>
            <Route path="/" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
