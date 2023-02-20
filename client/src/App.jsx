import React from 'react';
import AllRoutes from './routes';
import {
  BrowserRouter as Router, Routes
} from "react-router-dom";
import { Navbar } from './components/Navbar';
function App() {
  return (
    <Router>
      <Navbar />
      <AllRoutes />
    </Router>
  );
}

export default App;
