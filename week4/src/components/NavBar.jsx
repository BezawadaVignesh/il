import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Row, Col, Avatar, Dropdown } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  DollarOutlined,
  BookOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavItems = styled.div`
  display: flex;
  width: 100%;
  gap: 30px;
  justify-content: center;
`;

const NavItem = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "60px",
        backgroundColor: "#333333",
        color: "#ffff",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <NavItems>
        <NavItem onClick={() => navigate("/")}>
          {/* <HomeOutlined /> */}
          Home
        </NavItem>
        <NavItem onClick={() => navigate("/chess")}>Play chess</NavItem>
        <NavItem onClick={() => navigate("/randomword")}>
          Know a random word
        </NavItem>
        <NavItem onClick={() => navigate("/dogimg")}>View dog images</NavItem>
      </NavItems>
    </div>
  );
};

export default NavBar;
