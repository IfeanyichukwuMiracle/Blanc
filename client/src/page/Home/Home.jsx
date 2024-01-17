import { Header } from "../../components/Header";
import image from "../../assets/james-mckinven-tpuAo8gVs58-unsplash.jpg";
import { SingleProduct } from "../../components/Product";
import { UseProducts } from "../../data";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const { products } = UseProducts(`http://localhost:5003/products`);
  return (
    <>
      <Header />
      <main className="hero-section">
        {/* Hero Text */}
        <div className="hero-text">
          <p className="hero-title">Get The Gadget Of Your Dreams.</p>
          <p className="hero-subtitle">
            Sleek, Futuristic Designs That Aid Productivity
          </p>
          <p className="hero-body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            enim alias cum quas quis distinctio illo eaque obcaecati repellendus
            vero?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
            sunt voluptatum dolorem laborum dolores deserunt harum, aspernatur
            fugiat est distinctio!
          </p>
          <p className="hero-body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            enim alias cum quas quis distinctio illo eaque.
          </p>

          <Link to={`/products`}>
            <button className="btn cta-btn" style={{ marginTop: ".7rem" }}>
              Get Your Gadget
            </button>
          </Link>
        </div>

        {/* Hero image */}
        <div className="hero-image">
          <Link
            to={`/product/65a2d789f34bddf5b5ecbf42`}
            style={{ color: "var(--black)" }}
          >
            <img style={{ display: "block" }} src={image} alt="image" />
            <div className="discount-card">10% Off</div>
            <div className="hero-product-name">
              Mac book Pro 14: A Tech Bro&apos;s Favorite
            </div>
          </Link>
        </div>
      </main>

      {/* Product Categories */}
      <main className="product-categories">
        <p style={{ fontWeight: "800", fontSize: "1.5rem" }}>New Arrivals</p>
        <div className="products">
          {products.map((product) => {
            return (
              <Link
                to={`/product/${product._id}`}
                style={{ color: "var(--black)" }}
                key={product._id}
              >
                <SingleProduct {...product} />
              </Link>
            );
          })}
        </div>

        <div className="more-products">
          <Link to={`/products`} style={{ color: "white" }}>
            See More...
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
