import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'

import Presentation from './Pages/Presentation'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import Home from './Pages/Home'
import PrivateRoutes from './Context/PrivateRoutes'
import { CgPresentation } from 'react-icons/cg'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            
            <Route path='/home' element={
                <Home/>}/>
            <Route path='/' element={<LandingPage/>}/>

            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/present' element={<Presentation/>}/>

          </Routes>
        </AuthProvider>
    </Router>
    </>
  )
}

export default App
