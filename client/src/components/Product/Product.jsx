import "./product.css";

const SingleProduct = ({
  img,
  name,
  price,
  productName,
  productPrice,
  productImg,
}) => {
  return (
    <>
      <main className="product-card">
        <div className="product-tag">New</div>

        <div className="product-img">
          <img
            src={img || productImg}
            alt="product"
            style={{ display: "block" }}
          />
        </div>

        <div className="product-desc">
          <p className="product-name">{name || productName}</p>
          <p className="product-price">&#8358;{price || productPrice}</p>
        </div>

        <div className="product-icons">
          <div className="like">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              style={{ width: "1.8rem" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
        </div>
      </main>
    </>
  );
};

export default SingleProduct;
