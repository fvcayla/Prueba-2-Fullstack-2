import React from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../data/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

const Home = () => {
  const featuredProducts = productService.getAll().slice(0, 4);

  const handleAddToCart = (product) => {
    // Notificación visual (puedes usar toast library)
    console.log(`${product.name} añadido al carrito`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero bg-primary text-white py-5 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Bienvenido a TechStore</h1>
              <p className="lead mb-4">Tu destino para la mejor tecnología al mejor precio</p>
              <Link to="/productos" className="btn btn-light btn-lg">
                Ver Productos
              </Link>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://via.placeholder.com/600x400/3498db/ffffff?text=Hero+Image" 
                alt="TechStore Hero" 
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2 className="display-5 mb-3">Productos Destacados</h2>
              <p className="text-muted">Los productos más populares de nuestra tienda</p>
            </div>
          </div>
          <div className="row g-4">
            {featuredProducts.map(product => (
              <div key={product.id} className="col-md-6 col-lg-3">
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/productos" className="btn btn-outline-primary btn-lg">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
