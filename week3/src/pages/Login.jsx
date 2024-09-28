import { Button, Grid, Input } from "antd";
import {
  GoogleOutlined,
  LinkedinFilled,
  GithubFilled,
} from "@ant-design/icons";
import NavBar from "../components/common/NarBar/NavBar";
import { useContext, useState } from "react";
import { AlertContext } from "../components/common/AlertProvider";
import { useAuth } from '../components/Auth/AuthProvider';
import { useSearchParams } from "react-router-dom";

const CenteredCard = ({ title, children }) => {
  return (
    <div style={{ height: "calc(100vh - 60px)", display: "grid", placeItems: "center" }}>
      <div
        style={{
          borderTop: "5px solid #2222cc",
          borderRadius: "10px",
          minWidth: "250px",
          maxWidth: "400px",
          width: "40%",
          boxShadow: "0px 8px 20px 3px #33242452",
          display: "grid",
          placeItems: "center",
          paddingBlock: "30px",
        }}
      >
        <div
          style={{
            fontFamily:
              '-apple-system, Roboto, "Segoe UI", Helvetica, Arial, sans-serif',
            fontWeight: 700,
            fontSize: "2rem",
            color: "#2222cc",
            paddingBlock: "25px",
            textAlign: "center",
          }}
        >
          {title}
        </div>
        {children}
      </div>
    </div>
  );
};

const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [spassword, setSPassword] = useState("");
  const [scpassword, setSCPassword] = useState("");
  const [email, setEmail] = useState("");
  const alertMsg = useContext(AlertContext);
  const { loginAction } = useAuth();
  const [searchParams, ] = useSearchParams();
  return (
    <>
    <NavBar />
      {signIn ? (
        <CenteredCard title={"Sign In"}>
          <div style={{ display: "flex", columnGap: "10px" }}>
            {/* <Icon type="google" /> */}
            <Button shape="circle" size="large" icon={<GoogleOutlined />} />
            <Button shape="circle" size="large" icon={<GithubFilled />} />
            <Button shape="circle" size="large" icon={<LinkedinFilled />} />
          </div>
          <div
            style={{
              width: "max(75%, 200px)",
              display: "grid",
              placeItems: "center",
              rowGap: "10px",
              marginBlock: "10px",
            }}
          >
            Or
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="large"
              placeholder="Username"
            />
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="large"
              placeholder="Password"
            />
          </div>
          <div style={{ paddingBlock: "10px", color: "#6a6f73" }}>
            Forgot your password?
          </div>
          <div>
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={() =>{loginAction({userInfo: { username, password }, next: searchParams.get("next")} );}}
            >
              Sign In
            </Button>
          </div>
          <div
            style={{
              paddingBlock: "30px",
              color: "#6a6f73",
              cursor: "pointer",
            }}
            onClick={() => setSignIn(false)}
          >
            Don't have an account? <a href="#">Signup</a>
          </div>
        </CenteredCard>
      ) : (
        <CenteredCard title={"Sign Up"}>
          <div style={{ display: "flex", columnGap: "10px" }}>
            {/* <Icon type="google" /> */}
            <Button shape="circle" size="large" icon={<GoogleOutlined />} />
            <Button shape="circle" size="large" icon={<GithubFilled />} />
            <Button shape="circle" size="large" icon={<LinkedinFilled />} />
          </div>
          <div
            style={{
              width: "max(75%, 200px)",
              display: "grid",
              placeItems: "center",
              rowGap: "10px",
              marginBlock: "10px",
            }}
          >
            Or
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="large"
              placeholder="Username"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="large"
              type="email"
              placeholder="Email"
            />
            <Input
              value={spassword}
              onChange={(e) => setSPassword(e.target.value)}
              type="password"
              size="large"
              placeholder="Password"
            />
            <Input
              value={scpassword}
              onChange={(e) => setSCPassword(e.target.value)}
              type="password"
              size="large"
              placeholder="Conform Password"
            />
          </div>
          <div>
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={() =>
                alert(`Hello ${username} we can hear you, but we are not allowing sign up now`)
              }
            >
              Sign Up
            </Button>
          </div>
          <div
            style={{
              paddingBlock: "30px",
              color: "#6a6f73",
              cursor: "pointer",
            }}
            onClick={() => setSignIn(true)}
          >
            Already have an account? <a href="#">SignIn</a>
          </div>
        </CenteredCard>
      )}
    </>
  );
};

export default Login;
