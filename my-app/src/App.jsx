import { useEffect, useLayoutEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ScheduleSession from './Assessment/ScheduleSession';

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <BrowserRouter>
      <Routes>
<Route element={<ScheduleSession/>} path='/schedule' />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
