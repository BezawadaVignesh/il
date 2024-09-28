// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import LoadingScreen from "./components/LoadingScreen";
import AlertProvider from "./components/AlertProvider";
import { Switch, Spin, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { darkTheme, lightTheme } from "./components/common";
const RandomWord = lazy(() => import('./pages/RandomWord'));
const Chess = lazy(() => import('./pages/Chess'));
const DogImg = lazy(() => import('./pages/DogImg'));
const Home = lazy(() => import('./pages/Home'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chess",
    element: <Chess />,
  },
  {
    path: "/randomword",
    element: <RandomWord />,
  },
  {
    path: "/dogimg",
    element: <DogImg />,
  },
]);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const showLoader = () => {
    setSpinning(true);
    let ptg = -10;
    const interval = setInterval(() => {
      ptg += 5;
      if (ptg > 120) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 100);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            zIndex: 99,
          }}
        >
          <Switch checked={isDarkMode} onChange={() => toggleTheme()} />
          <Button onClick={showLoader}>Show fullscreen</Button>

          <Spin
            spinning={spinning}
            indicator={<LoadingOutlined spin />}
            size="large"
            fullscreen
          />
        </div>
        <AlertProvider>
          <RouterProvider router={router} />
        </AlertProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
