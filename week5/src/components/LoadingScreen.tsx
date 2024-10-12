import { Spin } from "antd";
import React from "react";

const LoadingScreen = () => {
    return (
      
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>
          <div
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              position: "absolute",
            }}
          >
            <Spin size="large"  />
          </div>
        </div>
    )
}

export default LoadingScreen;