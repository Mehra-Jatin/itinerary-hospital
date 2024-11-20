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
  {
    path: "/profile", // This will now render the Home component when navigating to "/"
    element:
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
      ,
    children: [
      {
        path: "", // This will now render the Home component when navigating to "/"
        element: <UserProfile />,
      },
      {
        path: "/profile/settings", // This will now render the Home component when navigating to "/"
        element: <UserSetting />,
      },
      {
        path: "/profile/appointements", // This will now render the Home component when navigating to "/"
        element: <UserAppoienments />,
      },
    ],
  },
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
  // admin and doctor dashboard routes
]);

// Render the app with the router provider
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
