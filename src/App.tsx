import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import ApacExpansion from './pages/ApacExpansion';
import ProblemManagement from './pages/ProblemManagement';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Sidebar />
        
        <main className="lg:pl-64 pt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/apac-expansion" element={<ApacExpansion />} />
            <Route path="/problems" element={<ProblemManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;