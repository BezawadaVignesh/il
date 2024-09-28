import React, { useState } from "react";
import enneaLogo from "/logo.svg";
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
import { useAuth } from "../../Auth/AuthProvider";
import styled from "styled-components";

const NavItems = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-evenly;
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

const Logo = () => {
  return (
    <div
      className="logo"
      style={{
        color: "white",
        paddingLeft: "20px",
        fontWeight: 700,
        fontSize: "1.2rem",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img width={"25px"} src={enneaLogo} alt="Logo"></img>
      <div>Ennea</div>
    </div>
  );
};

const categoriesMenu = (
  <Menu>
    <Menu.Item key="1">
      <span onClick={() => alert("Navigate to Technology")}>Technology</span>
    </Menu.Item>
    <Menu.Item key="2">
      <span onClick={() => alert("Navigate to Health")}>Health</span>
    </Menu.Item>
    <Menu.Item key="3">
      <span onClick={() => alert("Navigate to Science")}>Science</span>
    </Menu.Item>
    <Menu.Item key="4">
      <span onClick={() => alert("Navigate to Art")}>Art</span>
    </Menu.Item>
  </Menu>
);


const NavBar = () => {
  const [visible, setVisible] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  
  const user = auth ? auth.user : null;
  const logout = auth ? auth.logOut : () => {};
  
  const userMenu = (
    <Menu>
      <Menu.Item key="5">
        <span onClick={() => logout()}><LogoutOutlined /> Logout</span>
      </Menu.Item>
      
    </Menu>
  );

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
      <div>
        <Logo />
      </div>
      <NavItems>
        <NavItem onClick={() => navigate("/")}>
          <HomeOutlined />
          Home
        </NavItem>
        <NavItem onClick={() => navigate("/")}>
          <DollarOutlined />
          Plans and Pricing
        </NavItem>
        <Dropdown overlay={categoriesMenu} trigger={["hover"]}>
          <NavItem onClick={() => navigate("/")}>
            <BookOutlined />
            Categories
          </NavItem>
        </Dropdown>
      </NavItems>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <ShoppingCartOutlined style={{ fontSize: "25px" }} />
        {user ? (
        
            <Dropdown
              overlay={
                userMenu
              }
              trigger={["hover", "click"]}
            >
              <div style={{display: 'flex', gap: '10px', alignItems: "center"}}>
              <Avatar
                style={{ backgroundColor: "orange" }}
                icon={<UserOutlined />}
              />
              {user}
              </div>
            </Dropdown>
          
        ) : (
          <>
            <Button onClick={() => navigate("/login")}>Sign in</Button>{" "}
            <Button type="primary" onClick={() => navigate("/login")}>
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
