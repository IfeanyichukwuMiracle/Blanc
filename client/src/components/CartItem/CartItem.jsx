import "./cartitem.css";
import { AppContext } from "../../App";
import { useContext, useState } from "react";

const CartItem = ({ productImg, productName, productPrice, _id, quantity }) => {
  const { setCartItems } = useContext(AppContext);
  const [itemQuantity, setItemQuantity] = useState(1);

  return (
    <>
      <div className="cart-body">
        <div className="item">
          <img
            src={productImg}
            alt={productName}
            style={{ display: "block" }}
          />
          <p>{productName}</p>
        </div>
        <div className="cart-price body-price">&#8358;{productPrice}</div>
        <div className="quantity body-quantity">
          <div className="qty">
            <button
              className="add btn"
              onClick={() => {
                setItemQuantity(itemQuantity + 1);
                localStorage.setItem(
                  "products",
                  JSON.stringify(
                    JSON.parse(localStorage.getItem("products")).map((item) => {
                      if (item._id === _id) {
                        item.quantity = itemQuantity + 1;
                      } else {
                        if (item?.quantity) {
                          const { quantity } = item;
                          item.quantity = quantity;
                        }
                      }
                      return { ...item };
                    }),
                  ),
                );
                setCartItems(
                  JSON.parse(localStorage.getItem("products")).map((item) => {
                    if (item._id === _id) {
                      item.quantity = itemQuantity + 1;
                    } else {
                      if (item?.quantity) {
                        const { quantity } = item;
                        item.quantity = quantity;
                      }
                    }
                    return { ...item };
                  }),
                );
              }}
            >
              +
            </button>
            <div className="qty num">{quantity ? quantity : 1}</div>
            <button
              className="minus btn"
              onClick={() => {
                if (quantity > 1) {
                  setItemQuantity(itemQuantity - 1);
                  localStorage.setItem(
                    "products",
                    JSON.stringify(
                      JSON.parse(localStorage.getItem("products")).map(
                        (item) => {
                          if (item._id === _id) {
                            item.quantity = itemQuantity - 1;
                          } else {
                            if (item?.quantity) {
                              const { quantity } = item;
                              item.quantity = quantity;
                            }
                          }
                          return { ...item };
                        },
                      ),
                    ),
                  );
                  setCartItems(
                    JSON.parse(localStorage.getItem("products")).map((item) => {
                      if (item._id === _id) {
                        item.quantity = itemQuantity - 1;
                      } else {
                        if (item?.quantity) {
                          const { quantity } = item;
                          item.quantity = quantity;
                        }
                      }
                      return { ...item };
                    }),
                  );
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div
          className="total body-total"
          style={{ padding: "3.4rem 0 3rem 0" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="14"
            viewBox="0 0 448 512"
            style={{ cursor: "pointer", width: "1rem" }}
            onClick={() => {
              let newProducts = JSON.parse(
                localStorage.getItem("products"),
              ).filter((item) => item._id !== _id);
              setCartItems(newProducts);
              localStorage.setItem("products", JSON.stringify(newProducts));
            }}
          >
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default CartItem;
