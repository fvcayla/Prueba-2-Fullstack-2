import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cartService } from '../../data/database';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setAdding(true);
    cartService.add(product.id, 1);
    if (onAddToCart) {
      onAddToCart(product);
    }
    setTimeout(() => setAdding(false), 500);
  };

  return (
    <div className="card product-card h-100">
      <Link to={`/productos/${product.id}`} className="text-decoration-none">
        <img 
          src={product.image} 
          className="card-img-top" 
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <Link to={`/productos/${product.id}`} className="text-decoration-none text-dark">
          <h5 className="card-title">{product.name}</h5>
        </Link>
        <p className="card-text text-muted flex-grow-1">
          {product.description.substring(0, 100)}...
        </p>
        <div className="mt-auto">
          <p className="card-text">
            <strong className="text-primary fs-4">${product.price.toFixed(2)}</strong>
          </p>
          <button 
            className="btn btn-primary w-100" 
            onClick={handleAddToCart}
            disabled={adding}
          >
            {adding ? 'Agregando...' : 'Añadir al Carrito'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
