// import useContext below
import { useState, useContext } from "react";
// import useNavigate below
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { style } from "../../loading";
import { AppContext } from "../../App";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { setIsAdmin } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const notify = function (msg) {
    toast(msg);
  };

  const onInputChange = (e) => {
    setUser((prevUser) => {
      return { ...prevUser, [e.target.name]: e.target.value };
    });
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    notify(
      `Our team is currently working on this functionality to ensure your security. Try signing in with google`,
    );
    const { username, password } = user;
    if (username && password) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `https://nile2-0.onrender.com/users/login`,
          {
            ...user,
          },
          { withCredentials: true },
        );
        notify(response.data.msg);
        setIsLoading(false);
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        if (response.data.user.isAdmin) {
          localStorage.setItem(
            "isAdmin",
            JSON.stringify(response.data.user.isAdmin),
          );
        } else {
          localStorage.setItem("isAdmin", "");
        }
        if (!localStorage.getItem("products"))
          localStorage.setItem("products", JSON.stringify([]));
        setIsAdmin(Boolean(localStorage.getItem("")));
        setUser({ username: "", password: "" });
        setTimeout(() => {
          navigate(response.data.route);
        }, 3000);
        return;
      } catch (error) {
        notify("Login Error!\nTry again!");
        console.log(error);
        setIsLoading(false);
        setUser({ username: "", password: "" });
        return;
      }
    }
  };

  const google = () => {
    window.open(`https://nile2-0.onrender.com/users/google`, `_self`);
  };
  return (
    <>
      <header
        style={{ padding: ".4rem .9rem", borderBottom: "1.7px solid #f8f8f8" }}
      >
        <p style={{ fontSize: "1.8rem", fontWeight: "800" }}>
          <Link to={`/`} style={{ color: "var(--black)" }}>
            Nile
          </Link>
        </p>
      </header>

      <ToastContainer />
      <section className="form">
        <form action="#" method="post">
          <p
            style={{
              marginBottom: ".8rem",
              fontWeight: "700",
              fontSize: "1.4rem",
            }}
          >
            Login
          </p>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username or Email"
              value={user.username}
              onChange={onInputChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={user.password}
              onChange={onInputChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn"
              style={isLoading ? style : {}}
              onClick={onFormSubmit}
            >
              Login
            </button>
          </div>

          <p
            style={{
              fontSize: ".9rem",
              textAlign: "center",
              marginTop: ".5rem",
            }}
          >
            Don&apos;t Have an Account?{" "}
            <Link
              to={`/register`}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Register
            </Link>
          </p>
          <div className="google" onClick={google}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".4rem",
                width: "max-content",
                margin: "auto",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="15.25"
                viewBox="0 0 488 512"
              >
                <path
                  fill="#ffffff"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                />
              </svg>
              <p>Sign in with Google</p>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
