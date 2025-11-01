import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryService, productService } from '../../data/database';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});

  useEffect(() => {
    const allCategories = categoryService.getAll();
    setCategories(allCategories);

    // Contar productos por categoría
    const stats = {};
    allCategories.forEach(category => {
      const products = productService.getByCategory(category.name);
      stats[category.id] = products.length;
    });
    setCategoryStats(stats);
  }, []);

  return (
    <div className="categories-page">
      <section className="py-4 bg-light">
        <div className="container">
          <h1 className="display-5">Categorías</h1>
          <p className="lead">Explora nuestros productos por categoría</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {categories.map(category => (
              <div key={category.id} className="col-md-6 col-lg-4">
                <div className="card h-100 category-card">
                  <div className="card-body">
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text">{category.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-primary">
                        {categoryStats[category.id] || 0} productos
                      </span>
                      <Link 
                        to={`/categorias/${category.id}`} 
                        className="btn btn-primary"
                      >
                        Ver Productos
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;

