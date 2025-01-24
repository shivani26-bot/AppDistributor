import "./App.css";

import { createBrowserRouter, useLocation } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { RouterProvider } from "react-router";
import LandingPage from "./pages/LandingPage";
import { ThemeProvider } from "./components/ui/theme-provider";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Releases from "./pages/Releases";
import RequireAuth from "./components/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/authSignup",
        element: <SignupPage />,
      },
      {
        path: "/authLogin",
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        // element: <Dashboard />,
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/releases/:appName",
        element: <Releases />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
