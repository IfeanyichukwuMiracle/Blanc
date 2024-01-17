import "./product.css";
import { Header } from "../../components/Header";
import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SingleProduct } from "../../components/Product";
import { AppContext } from "../../App";
import { Comment } from "../../components/Comments";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UseComments } from "../../data";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [comment, setComment] = useState("");
  const [products, setProducts] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const { setCartItems } = useContext(AppContext);
  const { comments } = UseComments(
    `http://localhost:5003/comments/${productId}`,
  );
  const findProduct = async function () {
    try {
      const res = await axios.get(
        `http://localhost:5003/products/${productId}`,
        { withCredentials: true },
      );
      setProduct(res.data.product);
      const res2 = await axios.get(`http://localhost:5003/products`, {
        withCredentials: true,
      });
      setProducts(res2.data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const notify = (msg) => {
    toast(msg);
  };
  useEffect(() => {
    findProduct();
  }, [productId]);
  return (
    <>
      <Header />
      <ToastContainer />
      <main className="product-body">
        <nav>
          <Link to="/" style={{ color: "var(--black)" }}>
            Home
          </Link>
          &nbsp; / &nbsp;
          <Link
            to={`/product/${product._id}`}
            style={{ color: "var(--black)" }}
          >
            {product.productName}
          </Link>
        </nav>

        <section className="main-body">
          <div className="product-img">
            <img
              src={product.productImg}
              alt={product.productName}
              style={{ display: "block" }}
            />
          </div>

          <div className="product-desc">
            <p className="product-title">{product.productName}</p>

            <h3>Description</h3>
            <p style={{ lineHeight: "1.4rem", fontSize: ".93rem" }}>
              {product.productDesc}.&nbsp;
              {product.productDesc}.&nbsp;
              {product.productDesc}
            </p>

            <p className="price">&#8358;{product.productPrice}</p>
            <button
              className="btn"
              style={{
                background: "red",
                fontSize: "1.3rem",
                fontWeight: "800",
                padding: ".2rem 0 .4rem 0",
                width: "100%",
              }}
              onClick={() => {
                if (localStorage.getItem("products")) {
                  const foundProduct = JSON.parse(
                    localStorage.getItem("products"),
                  ).find((item) => item._id == product._id);
                  if (foundProduct) {
                    notify(`Item already in cart!`);
                  } else {
                    let products = JSON.parse(localStorage.getItem("products"));
                    products.push(product);
                    setCartItems(products);
                    localStorage.setItem("products", JSON.stringify(products));
                    notify(`Item added to cart`);
                  }
                } else {
                  localStorage.setItem("products", JSON.stringify([]));
                  let products = JSON.parse(localStorage.getItem("products"));
                  products.push(product);
                  setCartItems(products);
                  localStorage.setItem("products", JSON.stringify(products));
                  notify(`Item added to cart`);
                }
              }}
            >
              Buy Now
            </button>
          </div>
        </section>

        <section className="comment-section">
          <p className="comment-title">Comments</p>
          <form action="#">
            <textarea
              name="comment"
              id="comment"
              cols="30"
              rows="2"
              style={{
                background: "#f4f4f4",
                border: "none",
                padding: ".3rem",
                borderRadius: ".3rem",
              }}
              placeholder="Comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></textarea>

            <button
              type="submit"
              className="btn"
              style={{
                padding: ".2rem .3rem",
                fontWeight: "600",
                marginTop: ".3rem",
                background: isPosting ? "#ccc" : "black",
              }}
              onClick={async (e) => {
                e.preventDefault();
                if (comment) {
                  try {
                    setIsPosting(true);
                    const res = await axios.post(
                      `http://localhost:5003/comments/${productId}`,
                      { body: comment },
                      { withCredentials: true },
                    );
                    notify(res.data.msg);
                    setIsPosting(false);
                    setComment("");
                  } catch (error) {
                    console.log(error);
                    return;
                  }
                } else {
                  notify("Enter Comment to post");
                }
              }}
            >
              Comment
            </button>
          </form>

          {comments.length > 0 ? (
            comments.map((item) => {
              return <Comment key={item._id} {...item} />;
            })
          ) : (
            <div className="comments">No Comments!</div>
          )}
        </section>
        <section className="likely-products">
          <p style={{ fontWeight: "800", fontSize: "1.45rem" }}>
            You Might Like These
          </p>

          <section className="products-list">
            {products
              .filter((data) => data?.category == product?.category)
              .map((item) => {
                return (
                  <Link
                    to={`/product/${item._id}`}
                    key={item._id}
                    style={{ color: "var(--black)" }}
                  >
                    <SingleProduct {...item} />
                  </Link>
                );
              })}
          </section>
        </section>
      </main>
    </>
  );
};

export default Product;
