import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoryService, productService } from '../../data/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CategoryDetail.css';

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const categoryData = categoryService.getById(id);
    if (categoryData) {
      setCategory(categoryData);
      const categoryProducts = productService.getByCategory(categoryData.name);
      setProducts(categoryProducts);
    }
  }, [id]);

  if (!category) {
    return (
      <div className="category-detail-page">
        <div className="container py-5">
          <div className="alert alert-warning">
            Categoría no encontrada
          </div>
          <Link to="/categorias" className="btn btn-primary">
            Volver a Categorías
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="category-detail-page">
      <section className="py-4 bg-light">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Inicio</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/categorias">Categorías</Link>
              </li>
              <li className="breadcrumb-item active">{category.name}</li>
            </ol>
          </nav>
          <h1 className="display-5">{category.name}</h1>
          <p className="lead">{category.description}</p>
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
              No hay productos disponibles en esta categoría
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryDetail;

