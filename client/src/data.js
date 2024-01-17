import { useEffect, useState } from "react";
import axios from "axios";

export const UseProducts = (url) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const foundProducts = await axios.get(url, { withCredentials: true });
      setProducts(foundProducts.data);
      console.log(foundProducts.data?.msg);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return { products };
};

export const UseComments = (url) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async function () {
    try {
      const res = await axios.get(url, { withCredentials: true });
      if (res.data.comments.length > 0) {
        setComments(res.data.comments);
        console.log(res.data.comments);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    fetchComments();
  }, [url]);
  return { comments };
};
