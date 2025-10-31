import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService, cartService } from '../../data/database';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const productData = productService.getById(id);
    if (!productData) {
      navigate('/productos');
      return;
    }
    setProduct(productData);
  }, [id, navigate]);

  const handleAddToCart = () => {
    setAdding(true);
    for (let i = 0; i < quantity; i++) {
      cartService.add(product.id, 1);
    }
    setTimeout(() => {
      setAdding(false);
      alert(`${product.name} añadido al carrito!`);
    }, 500);
  };

  if (!product) {
    return <div className="container py-5">Cargando...</div>;
  }

  return (
    <div className="product-detail-page">
      <section className="py-5">
        <div className="container">
          <button 
            className="btn btn-outline-secondary mb-4" 
            onClick={() => navigate('/productos')}
          >
            ← Volver a Productos
          </button>
          
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <img 
                src={product.image.replace('250x200', '600x500')} 
                alt={product.name}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h1 className="display-4 mb-3">{product.name}</h1>
              <p className="text-muted fs-5 mb-4">Categoría: {product.category}</p>
              <p className="display-6 text-primary mb-4">
                ${product.price.toFixed(2)}
              </p>
              <p className="lead mb-4">{product.description}</p>
              
              <div className="mb-4">
                <label htmlFor="quantity" className="form-label">Cantidad:</label>
                <div className="input-group" style={{ maxWidth: '200px' }}>
                  <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control text-center"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-success">
                  <strong>Stock disponible:</strong> {product.stock} unidades
                </p>
              </div>

              <button 
                className="btn btn-primary btn-lg w-100 mb-3" 
                onClick={handleAddToCart}
                disabled={adding || product.stock === 0}
              >
                {adding ? 'Agregando...' : 'Añadir al Carrito'}
              </button>

              <div className="alert alert-info">
                <small>
                  <strong>Total:</strong> ${(product.price * quantity).toFixed(2)}
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
