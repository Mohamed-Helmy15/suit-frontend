import { useEffect, useState } from "react";
import App from "../App";

const RequireAuth = ({ children }) => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);
  return auth ? children : <App />;
};

export default RequireAuth;
