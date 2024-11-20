// import { useState } from 'react'
// import Home from './Pages/Home.jsx'

import './App.css'
import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </AuthProvider>
    
  )
}

export default App
