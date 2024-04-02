import { useState } from "react";
import "./admin.css";
import axios from "axios";
import { SingleProduct } from "../../components/Product";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UseProducts } from "../../data";

const Admin = () => {
  const [isModal, setIsModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { products } = UseProducts(`https://nile2-0.onrender.com/products`);
  const [details, setDetails] = useState({
    productName: "",
    productPrice: "",
    productDesc: "",
  });

  const onInputChange = (e) => {
    setDetails((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  const notify = (msg) => toast(msg);

  const onAddProduct = async (e) => {
    e.preventDefault();
    try {
      setIsFetching(true);
      const formData = new FormData(e.target);
      const response = await axios.post(
        `https://nile2-0.onrender.com/products/add/${
          JSON.parse(localStorage.getItem("user"))._id
        }`,
        formData,
        { withCredentials: true },
      );
      setIsFetching(false);
      notify(response.data?.msg);
      setIsModal(false);
      setDetails({ productDesc: "", productName: "", productPrice: "" });
      return;
    } catch (error) {
      console.log(error);
      notify(error.message);
      setDetails({ productDesc: "", productName: "", productPrice: "" });
      return;
    }
  };

  return (
    <>
      <ToastContainer />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.3}
        stroke="currentColor"
        className="w-6 h-6"
        style={{
          position: "fixed",
          bottom: ".9rem",
          right: ".9rem",
          width: "2.1rem",
          background: "var(--black)",
          color: "white",
          padding: ".3rem",
          boxSizing: "border-box",
          borderRadius: ".3rem",
          cursor: "pointer",
        }}
        onClick={() => setIsModal(true)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      <Link
        to={`/admin/dashboard`}
        style={{
          position: "fixed",
          bottom: ".9rem",
          right: "3.5rem",
          width: "max-content",
          background: "var(--black)",
          fontWeight: "800",
          color: "white",
          padding: ".45rem .5rem",
          boxSizing: "border-box",
          borderRadius: ".3rem",
          cursor: "pointer",
        }}
      >
        Check Orders
      </Link>

      {isModal && (
        <section className="admin-modal-container">
          <div className="admin-modal">
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
            <div className="admin-modal-content">
              <p style={{ fontWeight: "800", fontSize: "1.8rem" }}>
                Product Details
              </p>
              <form
                method="post"
                encType="multipart/form-data"
                onSubmit={(e) => onAddProduct(e)}
              >
                <div>
                  <input
                    type="text"
                    name="productName"
                    id="productName"
                    placeholder="Product Name"
                    value={details.productName}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div>
                  <textarea
                    name="productDesc"
                    id="productDesc"
                    cols="30"
                    placeholder="Product Description"
                    rows="5"
                    value={details.productDesc}
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                </div>
                <div>
                  <input
                    type="number"
                    name="productPrice"
                    id="productPrice"
                    placeholder="Product Price"
                    value={details.productPrice}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div style={{ marginTop: ".5rem" }}>
                  <label
                    htmlFor="productImg"
                    className="btn"
                    style={{
                      width: "100%",
                      padding: ".3rem",
                      marginTop: ".7rem",
                      borderRadius: ".3rem",
                    }}
                  >
                    Product Image
                  </label>
                  <input
                    type="file"
                    name="productImg"
                    id="productImg"
                    placeholder="Product Image"
                    style={{ display: "none" }}
                  />
                </div>
                <div style={{ marginTop: "1.6rem" }}>
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      padding: ".36rem",
                      fontSize: "1rem",
                      fontWeight: "800",
                      width: "100%",
                      background: isFetching ? "ccc" : "var(--black)",
                    }}
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Header section */}
      <header>
        <Link to={`/`} style={{ color: "black" }}>
          <p className="logo" style={{ fontWeight: "800" }}>
            Nile
          </p>
        </Link>
      </header>

      <section className="added-products-section">
        <main className="added-products-container">
          <p style={{ fontWeight: "800", fontSize: "1.5rem" }}>
            Products You&apos;ve Added!
          </p>

          {/* Added products list */}
          {products.length > 0 ? (
            <div
              className="added-products-list"
              style={{ marginTop: "1.8rem" }}
            >
              {products.map((product) => {
                return (
                  <Link
                    to={`/product/${product._id}`}
                    style={{ color: "black" }}
                    key={product._id}
                  >
                    <SingleProduct {...product} />
                  </Link>
                );
              })}
            </div>
          ) : (
            <p style={{ marginTop: ".8rem" }}>
              You don&apos;t have any products on your list!
            </p>
          )}
        </main>
      </section>
    </>
  );
};

export default Admin;
