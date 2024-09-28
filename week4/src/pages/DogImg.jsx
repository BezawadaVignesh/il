import { Button, Spin } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import { LoadingOutlined } from "@ant-design/icons";
import { AlertContext } from "../components/AlertProvider";
import { PageRightWrapper, PageUpWrapper } from "../components/Animations";

const DogImg = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const alertMsg = useContext(AlertContext);
  return (
    <div>
      <NavBar />
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined spin />}
        size="large"
        fullscreen
      />
      <PageRightWrapper>
      <div style={{ display: "grid", placeItems: "center" }}>
        <div
          style={{
            fontSize: "4rem",
            fontWeight: 700,
          }}
        >
          Dog Images
        </div>
        <Button
          style={{ marginBlock: "20px" }}
          onClick={() => {
            setLoading(true)
            axios
              .get("https://dog.ceo/api/breeds/image/random")
              .then(({ data }) => {
                setImgSrc(data.message);
              }).catch(()=>{
alertMsg.showAlert("Couldn't get a image right now", "error")
              }).finally(()=>{
                setLoading(false)
              });
          }}
        >
          Get new image
        </Button>
        {imgSrc ? (
          <img src={imgSrc}></img>
        ) : (
          <div
            style={{ height: "500px", display: "grid", placeItems: "center" }}
          >
            Click On the Button to show new image..
          </div>
        )}
      </div>
      </PageRightWrapper>
    </div>
  );
};
export default DogImg;
