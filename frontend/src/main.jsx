import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home.jsx';  // Import the Home component
import Doctor from './Pages/Doctor.jsx';

// Define the router configuration with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  // This is the root layout component
    children: [
      {
        path: "/home",  // This will now render the Home component when navigating to "/"
        element: <Home />,  // The component for the homepage
      },
      {
        path: "doctor",  // This will render the Doctor component at "/doctor"
        element: <Doctor />,
      },
    ],
  },
]);

// Render the app with the router provider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
