import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../common/LoadingScreen";
import { AlertContext } from "../common/AlertProvider"


const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userObj, setUserObj] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const alertMsg = useContext(AlertContext);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        localStorage.setItem("token", token);
        try {
          const tdata = jwtDecode(token);
          let { sub, username, role } = tdata;

          // Send a request to the backend to validate the token and get user info
        //   const { data } = await Axios.get("/api/users/whoami");

        //   if (data && data.username === username) {
            setUser(username);
            setUserObj({ id: sub, username: username, role: role });
        //   } else {
        //     throw new Error("Token validation failed");
        //   }
        } catch (e) {
        //   alert?.showAlert("Error validating the token", "error");
          alert("Error validating the token")
          console.log(e);
          logOut();
        } finally {
          setLoading(false);
        }
      } else {
        delete Axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        // alert?.showAlert("Please relogin as the token is corrupted", "error");
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const loginAction = useMemo(
    () => async ({ userInfo: { username, password }, next }) => {
      try {
        // const response = await Axios.post("api/users/authenticate", {
        //   username: username,
        //   password: password,
        // });
        // if (response.data && response.status === 200) {
        //   setUser(response.data.username);
        //   setToken(response.data.token);
        //   setUserObj(response.data);
        //   navigate(next == undefined || next == null ? "/" : next);
        //   return;
        // }
        // throw new Error(response.data);
            setUser(username);
          setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1OTY1ODIsImV4cCI6MTcyNzIwMTM4Mn0.k9GVnlXWrF1ddPu9oeLfX3uACmKHVKpPCOIlTjVhXNc");
          setUserObj({username, role: 'admin'});
          navigate(next == undefined || next == null ? "/" : next);
          alertMsg.showAlert("Welcome back", "info")
      } catch (err) {
        console.error(err);
        // alert?.showAlert("" + err, "error");
        alert(""+err)
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logOut = useMemo(
    () => () => {
      setUser(null);
      setToken("");
      setUserObj(null);
      navigate("/login");
    },
    []
  );

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <AuthContext.Provider value={{ token, user, userObj, Axios, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
