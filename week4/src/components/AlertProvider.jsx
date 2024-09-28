/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { createContext } from "react";
import { notification } from "antd";

export const AlertContext = createContext(null);


const AlertProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  const showAlert = (message, type, description) => {
    api[type]({
        showProgress: true,
      message: message,
      placement: "top",
      description
    });
  };
  return (
    <AlertContext.Provider value={{ showAlert }}>
      {contextHolder}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
