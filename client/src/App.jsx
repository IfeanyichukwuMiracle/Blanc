import { Home } from "./page/Home";
import { Register } from "./page/Register";
import { Login } from "./page/Login";
import { Cart } from "./page/Cart";
import { Product } from "./page/Product";
import { Products } from "./page/Products";
import { Admin } from "./page/Admin";
import { Dashboard } from "./page/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

function App() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("products")) {
      setCartItems(JSON.parse(localStorage.getItem("products")));
    } else {
      localStorage.setItem("products", JSON.stringify([]));
    }
    if (localStorage.getItem("isAdmin")) {
      setIsAdmin(Boolean(localStorage.getItem("isAdmin")));
    }
  }, []);
  return (
    <AppContext.Provider
      value={{ isAdmin, setIsAdmin, cartItems, setCartItems }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/admin/dashboard"
            element={
              Boolean(localStorage.getItem("isAdmin")) ? (
                <Admin />
              ) : (
                <Navigate to={`/login`} />
              )
            }
          />
          <Route
            path="admin/orders"
            element={
              Boolean(localStorage.getItem("isAdmin")) ? (
                <Dashboard />
              ) : (
                <Navigate to={`/login`} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
