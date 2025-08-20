import React from 'react'
import './App.css'
import Home from '../pages/Home'
import About from '../pages/About'
import ContactUs from '../pages/ContactUs'
import Timer from '../pages/Timer'
import Navbar from '../components/Navbar'
import { Routes,Route } from 'react-router-dom'
function App() {
  return <>
  <Navbar />
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/contactUs' element={<ContactUs/>} />
    <Route path='/timer' element={<Timer/>} />
    
  </Routes>
    
  </>
}

// No design changes needed in App.jsx, layout handled in Home and Navbar

export default App
