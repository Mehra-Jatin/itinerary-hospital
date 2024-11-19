// import { useState } from 'react'
// import Home from './Pages/Home.jsx'

import './App.css'
import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
