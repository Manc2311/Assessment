import { useEffect, useLayoutEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ScheduleSession from './Assessment/ScheduleSession';
import Home from './Home/Home';

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}  />
          <Route path='/schedule-session' element={<ScheduleSession />}  />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
