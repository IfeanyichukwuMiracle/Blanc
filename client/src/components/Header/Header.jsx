import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import "./header.css";
import { AppContext } from "../../App";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { cartItems, setCartItems } = useContext(AppContext);
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  const notify = (msg) => toast(msg);
  return (
    <>
      <ToastContainer />
      <section className="flash-sale-banner">
        10% Discount | Till 23rd January |&nbsp;
        <span>
          <Link to="/products">Shop Now</Link>
        </span>
      </section>
      <header className="main-banner">
        <p className="logo">
          <Link to={`/`} style={{ color: "var(--black)" }}>
            Nile
          </Link>
        </p>
        <div id="cart" className="mobile-cart">
          <Link to={`/cart`} style={{ color: "var(--black)" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              style={{ width: "1.5rem" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <div className="cart-count">
              {/* {JSON.parse(localStorage.getItem("products"))
                ? JSON.parse(localStorage.getItem("products")).length
                : 0} */}
              {cartItems.length}
            </div>
          </Link>
        </div>

        <ul>
          <li>
            {localStorage.getItem("user") ? (
              <p
                onClick={async () => {
                  if (
                    localStorage.getItem("products") &&
                    JSON.parse(localStorage.getItem("products")).length > 0
                  ) {
                    setIsModal(true);
                  } else {
                    const res = await axios.get(
                      "https://nile2-0.onrender.com/users/logout",
                      {
                        withCredentials: true,
                      },
                    );
                    notify(res.data.msg);
                    localStorage.removeItem("user");
                    localStorage.removeItem("isAdmin");
                    setTimeout(() => {
                      navigate("/login");
                    }, 3000);
                  }
                }}
              >
                Logout
              </p>
            ) : (
              <Link to={`/login`} style={{ color: "var(--black)" }}>
                Sign up / Login
              </Link>
            )}
          </li>
          <li>Help</li>
          {Boolean(localStorage.getItem("isAdmin")) ? (
            <Link to="/admin/dashboard">
              <li className="dashboard-btn">Dashboard</li>
            </Link>
          ) : (
            <></>
          )}
          <li id="cart">
            <Link to={`/cart`} style={{ color: "var(--black)" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                style={{ width: "1.5rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <div className="cart-count">
                {/* {JSON.parse(localStorage.getItem("products"))
                  ? JSON.parse(localStorage.getItem("products")).length
                  : 0} */}
                {cartItems.length}
              </div>
            </Link>
          </li>
        </ul>
        <div
          className="menu"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          Menu
        </div>
      </header>
      {menu && (
        <section className="menu-items">
          <div>
            <Link to={`/products`} style={{ color: "var(--black)" }}>
              All Products
            </Link>
          </div>
          {/* <div>
            <Link to={`/login`} style={{ color: "var(--black)" }}>
              Login
            </Link>
          </div>
          <div>Help</div> */}
          <div>
            {localStorage.getItem("user") ? (
              <p
                onClick={async () => {
                  if (
                    localStorage.getItem("products") &&
                    JSON.parse(localStorage.getItem("products")).length > 0
                  ) {
                    setIsModal(true);
                  } else {
                    const res = await axios.get(
                      "https://nile2-0.onrender.com/users/logout",
                      {
                        withCredentials: true,
                      },
                    );
                    notify(res.data.msg);
                    localStorage.removeItem("user");
                    localStorage.removeItem("isAdmin");
                    setTimeout(() => {
                      navigate("/login");
                    }, 3000);
                  }
                }}
              >
                Logout
              </p>
            ) : (
              <Link to={`/login`} style={{ color: "var(--black)" }}>
                Sign up / Login
              </Link>
            )}
          </div>
        </section>
      )}

      {isModal ? (
        <section className="logout-modal-container">
          <div className="logout-modal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.6}
              stroke="currentColor"
              className="w-6 h-6"
              style={{
                width: "1.6rem",
                color: "red",
                position: "absolute",
                top: ".3rem",
                right: ".3rem",
                cursor: "pointer",
              }}
              onClick={() => setIsModal(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <div className="logout-modal-content">
              <p className="modal-title">
                You&apos;ve still got {cartItems.length} items in cart.
              </p>

              <div className="modal-links">
                <Link
                  to="/cart"
                  style={{ textDecoration: "underline", color: "blue" }}
                  onClick={() => setIsModal(false)}
                >
                  Continue to cart
                </Link>
                <p
                  className="modal-logout btn"
                  style={{ padding: ".4rem .5rem", fontWeight: "600" }}
                  onClick={async () => {
                    const res = await axios.get(
                      "https://nile2-0.onrender.com/users/logout",
                      {
                        withCredentials: true,
                      },
                    );
                    notify(res.data.msg);
                    localStorage.removeItem("user");
                    localStorage.removeItem("products");
                    localStorage.removeItem("isAdmin");
                    setCartItems([]);
                    setTimeout(() => {
                      navigate("/login");
                    }, 3000);
                  }}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
