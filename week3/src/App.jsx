import React, { Suspense, useState } from "react";
import enneaLogo from "/logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Login from "./pages/Login";
import AuthProvider from "./components/Auth/AuthProvider";
import LoadingScreen from "./components/common/LoadingScreen";
import PrivateRoute from "./components/Auth/PrivateRouter";
import AlertProvider from "./components/common/AlertProvider";
import { ThemeProvider } from "styled-components";
import { Switch } from 'antd';



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/loding",
        element: <LoadingScreen />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/p",
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

export const lightTheme = {
  background: "#ffffff",
  text: "#333333",
  primary: "#1890ff",
  secondary: "#6a6f73",
  cardBackground: "#f9f9f9",
  logoColor: "#1890ff",
  mode: 'light',
};

export const darkTheme = {
  background: "#1a1a1a",
  text: "#ffffff",
  primary: "#ff9f00",
  secondary: "#999999",
  cardBackground: "#333333",
  logoColor: "#ff9f00",
  mode: 'dark',
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <Suspense fallback={<LoadingScreen />}>
      
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <div style={{position: 'fixed', bottom: '20px', left: '20px', zIndex: 99}}>

        <Switch checked={isDarkMode} onChange={()=>toggleTheme()}/>
          </div>
      <AlertProvider >
        <RouterProvider router={router} />
      </AlertProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
