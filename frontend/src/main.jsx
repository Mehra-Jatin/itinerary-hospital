import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx"; // Import the Home component
import Doctor from "./Pages/Doctor.jsx";
import DoctorProfile from "./Pages/DoctorProfile.jsx";
import Appointment from "./Pages/Appointment.jsx"; // Import the Appointment component
import UserProfile from "./Pages/user/UserProfile.jsx";
import UserAppoienments from "./Pages/user/UserAppoienments.jsx";
import UserSetting from "./Pages/user/UserSetting.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import AuthLayout from "./Pages/Auth/AuthLayout";
import UserLayout from "./Pages/UserLayout.jsx";
import ProtectedRoute from "./hooks/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedLoginRoute from "./hooks/ProtectedLoginRoute";
import DoctorLayout from "./Pages/doctor/DoctorLayout";
import DoctorDashboardLayout from "./Pages/Dashboard/doctor/DoctorDashboardLayout";
import DoctorNavigation from "./Pages/doctor/DoctorNavigation";
import DocProfile from "./Pages/doctor/DocProfile";

import UserHistory from "./Pages/user/UserHistory";
import DashboardLayout from "./Pages/Dashboard/Layout";
import SchedulePage from "./Pages/Dashboard/doctor/SchedulesPage";
import DocAppointments from "./Pages/Dashboard/doctor/DocAppoitments";
import DoctorChat from "./Pages/Dashboard/doctor/DoctorChatPage";
import DoctHistoriesPage from "./Pages/Dashboard/doctor/DoctorHistory";
import { Toaster } from "./components/ui/toaster";

import AdminDashboard from "./Pages/Dashboard/admin/AdminDashboard";
import ManageDoctors from "./Pages/Dashboard/admin/pages/ManageDoctor";
import VerifyDoctors from "./Pages/Dashboard/admin/pages/VerifyDoctor";
import ManageAppointments from "./Pages/Dashboard/admin/pages/ManageAppointment";
import ManagePatients from "./Pages/Dashboard/admin/pages/ManagePatient";
import AdminSetting from "./Pages/Dashboard/admin/pages/AdminSetting";
import AdminTransaction from "./Pages/Dashboard/admin/pages/AdminTransaction";
import AdminNotification from "./Pages/Dashboard/admin/pages/AdminNotification";

// Define the router configuration with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // This is the root layout component
    children: [
      {
        path: "", // This will now render the Home component when navigating to "/"
        element: <Home />, // The component for the homepage
      },
      {
        path: "doctor", // This will render the Doctor component at "/doctor"
        element: <Doctor />,
        // children: [
        //   {
        //     path: "doctorprofile",  // This will render the DoctorProfile component at "/doctor/doctorprofile"
        //     element: <DoctorProfile />,
        //   },
        //   {
        //     path: "appointment",  // This will render the Appointment component at "/doctor/appointment"
        //     element: <Appointment />,
        //   },
        // ],
      },
      {
        path: "/doctor/doctorprofile", // This will now render the Home component when navigating to "/"
        element: <DoctorProfile />, // The component for the homepage
      },
      {
        path: "/doctor/appointement", // This will now render the Home component when navigating to "/"
        element: <Appointment />, // The component for the homepage
      },
    ],
  },

  

  // Auth routes
  {
    path: "/auth",
    element: <ProtectedLoginRoute><AuthLayout /></ProtectedLoginRoute>,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      }
    ]
  },
  // patient routes
  {
    path: "/profile",
    element:
      <ProtectedRoute role="patient">
        <UserLayout />
      </ProtectedRoute>
    ,
    children: [
      {
        path: "",
        element: <UserProfile />,
      },
      {
        path: "/profile/settings",
        element: <UserSetting />,
      },
      {
        path: "/profile/appointements",
        element: <UserAppoienments />,
      },
      {
        path: "/profile/history",
        element: <UserHistory />,
      },
    ],
  },
  {
    path: "/doctor-profile",
    element: <ProtectedRoute role="doctor">
      <DoctorLayout />
    </ProtectedRoute>,
    children: [
      {
        path: "",
        element: <DocProfile />,
      },
      {
        path: "/doctor-profile/doctor-navigation",
        element: <DoctorNavigation />,
      }
    ]
  },
  // admin and doctor dashboard routes

  // doctor dashboard
  {
    path: "/doctor-dashboard",
    element: 
    <ProtectedRoute role="doctor">
      <DashboardLayout/>
    </ProtectedRoute>,
    children: [
      // {
      //   path: "",
      //   element: <DoctorProfile />,
      // },
      {
        path: "",
        element: <DoctorDashboardLayout />,
      },
      {
        path: "schedules",  
        element: <SchedulePage />,
      },
      {
        path: "appointments",  
        element: <DocAppointments />,
      },
      {
        path: "messages",  
        element: <DoctorChat />,
      },
      {
        path: "histories",  
        element: <DoctHistoriesPage />,
      },
    ]
  },

  // admin dashboard
  {
    path: "/admin-dashboard",
    element: 
    <ProtectedRoute role="admin">
      <DashboardLayout/>
    </ProtectedRoute>,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
      {
        path: "manage-doctors",  
        element: <ManageDoctors />,
      },
      {
        path: "verify-doctors",  
        element: <VerifyDoctors />,
      },
      {
        path: "manage-appointments",
        element: <ManageAppointments />,
      },
      {
        path: "manage-patients",  
        element: <ManagePatients />,
      },
      {
        path: "transactions",  
        element: <AdminTransaction />,
      },
      {
        path: "notifications",  
        element: <AdminNotification />,
      },
      {
        path: "settings",  
        element: <AdminSetting />,
      },
      
    ]
  },


  // this for unknown routes
  {
    path: "*",
    element: (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1 className=" text-3xl italic font-bold">404 | Page Not Found</h1>{" "}
        <Link
          to={"/"}
          className="text-3xl italic font-bold hover:underline ml-3"
        >
          {" "}
          Go back to Home
        </Link>
      </div>
    ),
  },
]);

// Render the app with the router provider
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
