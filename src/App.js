import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import RawData from './screens/RawData';
import Sidebar from './components/sidebar';
import CssBaseline from '@mui/material/CssBaseline';

function App() {

  return (
    <div>
      <Router>
        <CssBaseline /> {/* Normalizes the styling across browsers */}
        <Sidebar />
        <div style={{ marginLeft: 240 }}> {/* Adjust the main content margin based on the sidebar width */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/data" element={<RawData/>} />
            <Route path="/" exact element={<Dashboard/>} />
          </Routes>
        </div>
      </Router>
    </div>
      
  );
}

export default App;
