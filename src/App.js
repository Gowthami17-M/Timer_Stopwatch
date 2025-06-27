import React from "react";
import './index.css';
import Layout from './Layout.js';
import Clock from "./components/Clock/Clock";
import Timer from './components/Countdowntimer/Timer';
import Stopwatch from './components/stopwatch/Stopwatch';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/Timer_Stopwatch">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to="/clock" />} />
          <Route path="clock" element={<Clock />} />
          <Route path="timer" element={<Timer />} />
          <Route path="stopwatch" element={<Stopwatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
