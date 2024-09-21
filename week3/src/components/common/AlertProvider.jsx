import React, { createContext, useState } from "react";
import { notification, Alert } from "antd";

export const AlertContext = createContext(null);

const AlertProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  const showAlert = (message, type, description) => {
    api[type]({
        showProgress: true,
      message: message,
      placement: "top",
    
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
