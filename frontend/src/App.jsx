// import { useState } from 'react'
// import Home from './Pages/Home.jsx'

import './App.css'
import Navbar from './components/Navbar.jsx'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { DoctorProvider } from './contexts/DoctorContext'
import { PatientProvider } from './contexts/PatientContext'

function App() {
  return (
    <AuthProvider>
      <DoctorProvider>
        <PatientProvider>
        <ScrollRestoration />
          <Navbar />
          <Outlet />
          <Footer />
        </PatientProvider>
      </DoctorProvider>
    </AuthProvider>

  )
}

export default App
