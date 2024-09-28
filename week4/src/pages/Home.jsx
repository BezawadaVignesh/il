import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background: 'url("/bg.jpg")',
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1,
        }}
      >
        <div style={{ marginInline: "20px", maxWidth: "900px" }}>
          <div style={{ fontSize: "5rem", fontWeight: 700 }}>
            Feeling bored?{" "}
          </div>
          <div style={{ fontSize: "2rem" }}>
            Unwind with a game of chess, discover a new word, or enjoy a cute
            dog pic!
          </div>
        </div>
        <div style={{ position: "absolute", top: "50%", left: "60%" }}>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              width: "200px",
              gap: "20px",
            }}
          >
            <Button
              onClick={() => navigate("/chess")}
              size="large"
              type="primary"
              danger
              style={{ width: "100%" }}
            >
              Play Chess
            </Button>
            <Button
              onClick={() => navigate("/randomword")}
              size="large"
              type="primary"
              danger
              style={{ width: "100%" }}
            >
              Know a random word
            </Button>
            <Button
              onClick={() => navigate("/dogimg")}
              size="large"
              type="primary"
              danger
              style={{ width: "100%" }}
            >
              View Dog Images
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
