import React, { useState, useEffect } from 'react';
import { productService } from '../../data/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Offers.css';

const Offers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const onSaleProducts = productService.getOnSale();
    setProducts(onSaleProducts);
  }, []);

  return (
    <div className="offers-page">
      <section className="py-4 bg-danger text-white">
        <div className="container">
          <h1 className="display-5">⚡ Ofertas Especiales ⚡</h1>
          <p className="lead">Productos con descuentos increíbles</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {products.length > 0 ? (
            <div className="row g-4">
              {products.map(product => (
                <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              No hay ofertas disponibles en este momento
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Offers;

