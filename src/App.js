import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";

import Header from './components/Header.jsx';
import Robot from './pages/Robot.jsx';
import Motor from './pages/Motor.jsx';
import Vision from './pages/Vision.jsx';
import Footer from './components/Footer.jsx';
import Connection from './components/Connection.jsx';

function App() {
  let routes;

  routes = (
    <Routes>
      <Route path="/robot" element={<Robot />} />
      <Route path="/motor" element={<Motor />} />
      <Route path="/vision" element={<Vision />} />
      <Route path="*" element={<Robot />} />
    </Routes>
  )
  return (
    <div className="App h-screen max-h-screen flex flex-col bg-black text-white overflow-hidden">
      <Header />
      <Connection />
      {routes}
      <Footer />
    </div>
  );
}

export default App;
