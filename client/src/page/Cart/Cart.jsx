import "./cart.css";
import { Header } from "../../components/Header";
import { CartItem } from "../../components/CartItem";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import { useContext } from "react";
import { PaystackButton } from "react-paystack";

const Cart = () => {
  const { cartItems } = useContext(AppContext);
  const getTotal = () => {
    let count = 0;
    cartItems.forEach((item) => {
      count += item?.productPrice * (item.quantity || 1);
    });
    return count;
  };

  const componentProps = {
    email:
      JSON.parse(localStorage.getItem("user"))?.email ||
      "ifeanyimiraclechuks@gmail.com",
    amount: getTotal() * 100,
    metadata: {
      name: JSON.parse(localStorage.getItem("user"))?.username || "miracle",
      phone: "",
    },
    publicKey: "pk_live_770b736c57f13522c75b39d729da2d7bc769fc9b",
    text: "Pay Now",
    onSuccess: () =>
      alert(
        "Thanks for doing business with us, your goods would be seen 4 days after payment",
      ),
    onClose: () => alert("Wait! Keep on shopping for gadgets you love"),
  };
  return (
    <>
      <Header />

      <main className="cart-container">
        <p className="cart-title">{cartItems.length} Cart Items</p>

        <div className="cart-section">
          {cartItems.length !== 0 ? (
            <div className="cart-header">
              <div className="item">Item</div>
              <div className="cart-price">Price</div>
              <div className="quantity">Quantity</div>
              <div className="total">Remove Item</div>
            </div>
          ) : (
            ``
          )}
          {cartItems.length !== 0
            ? cartItems.map((item) => {
                return <CartItem key={item._id} {...item} />;
              })
            : `Cart is Empty!`}
        </div>

        <div className="subtotal">
          <Link
            to={`/products`}
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Continue Shopping
          </Link>

          {JSON.parse(localStorage.getItem("products")).length > 0 ? (
            <div className="checkout">
              <div className="overall-total">
                <p style={{ fontWeight: "800", fontSize: "1.5rem" }}>
                  Subtotal:
                </p>
                <p
                  style={{
                    fontWeight: "800",
                    fontSize: "1.5rem",
                    color: "red",
                  }}
                >
                  &#8358;{getTotal()}
                </p>
              </div>

              <PaystackButton {...componentProps} />
            </div>
          ) : (
            ``
          )}
        </div>
      </main>
    </>
  );
};

export default Cart;
