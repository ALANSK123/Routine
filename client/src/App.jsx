import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import { TaskProvider } from './context/TaskContext';


function App() {
  return (
    <Router>
      <TaskProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </MainLayout>
      </TaskProvider>
    </Router>
  );
}

export default App;
