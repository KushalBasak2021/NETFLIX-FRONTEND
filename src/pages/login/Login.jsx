import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch, isFetching, error } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    login({ email, password }, dispatch);
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="loginButton"
            onClick={handleLogin}
            disabled={isFetching}
          >
            Sign In
          </button>
          {error && (
            <span
              style={{ marginTop: "10px", fontWeight: "bold", color: "white" }}
            >
              Wrong email or password
            </span>
          )}
          <span>
            New to Netflix?{" "}
            <b>
              <Link to="/register">Sign up now.</Link>
            </b>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
