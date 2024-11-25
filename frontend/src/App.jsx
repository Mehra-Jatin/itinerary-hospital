// import { useState } from 'react'
// import Home from './Pages/Home.jsx'

import './App.css'
import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { DoctorProvider } from './contexts/DoctorContext'

function App() {
  return (
    <AuthProvider>
      <DoctorProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </DoctorProvider>

    </AuthProvider>

  )
}

export default App
