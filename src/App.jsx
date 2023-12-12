import React, { useState } from 'react';
import { BrowserRouter, Route, Link, Router, Routes, NavLink, Navigate, useNavigate } from 'react-router-dom';

// import Galaxy from './Components/Galaxy';
import MyHomePage from './Pages/MyHomePage';
import Services from './Pages/Services';
import './style/App.css'
import './style/index.css'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<MyHomePage />} />
        <Route path='/services/*' element={<Services />} />
        {/* <Route path='*' element={<MyHomePage />} /> */}
      </Routes>
    </>
  )
}
export default App;