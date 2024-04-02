import "./products.css";
import { Header } from "../../components/Header";
import { SingleProduct } from "../../components/Product";
// import { products } from "../../data";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [list, setList] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const notify = (msg) => {
    toast(msg);
  };

  const fetchProducts = async (url) => {
    try {
      const res = await axios.get(url, {
        withCredentials: true,
      });
      setProducts(res.data);
      setList(res.data);
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    fetchProducts(`https://nile2-0.onrender.com/products`);
  }, []);
  return (
    <>
      <Header />
      <ToastContainer />
      <main className="all-products-container">
        <form action="#" className="search">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter Product"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <button
            type="submit"
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              if (search) {
                setList(
                  list.filter((item) =>
                    item.productName.toLowerCase().includes(search),
                  ),
                );
                setSearch("");
                return;
              }

              notify("Fill Search Box!");
            }}
          >
            Search
          </button>
        </form>
        <p
          className="all-p-title"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setList(products);
          }}
        >
          All Products
        </p>

        <div className="all-products">
          {list[0]
            ? list.map((item) => {
                return (
                  <Link
                    to={`/product/${item._id}`}
                    key={item._id}
                    style={{ color: "var(--black)" }}
                  >
                    <SingleProduct {...item} />
                  </Link>
                );
              })
            : `No Products Found!`}
        </div>
      </main>
    </>
  );
};

export default Products;
