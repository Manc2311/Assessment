import { useEffect, useLayoutEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ScheduleSession from './Assessment/ScheduleSession';
import Home from './Home/Home';
import PolicyDetails from './PolicyAssesment/PolicyDetails';
import Login from './Login/Login';
import Register from './Register/Register';
import Illustration from './PolicyAssesment/Illustration';
import Calculator from './PolicyAssesment/Calculator';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/schedule-session' element={<ScheduleSession />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/illustration" element={<Illustration />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
