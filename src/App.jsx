import React, { useState } from 'react';
import { BrowserRouter, Route, Link, Router, Routes, NavLink, Navigate, useNavigate } from 'react-router-dom';

import MyHomePage from './Pages/MyHomePage.tsx';
import Services from './Pages/Services.tsx';
import './style/App.css'
import './style/index.css'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MyHomePage />} />
      <Route path='/services/*' element={<Services />} />
    </Routes>
  )
}
export default App;