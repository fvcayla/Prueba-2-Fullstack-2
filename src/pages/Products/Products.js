import React, { useState, useEffect } from 'react';
import { productService } from '../../data/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const allProducts = productService.getAll();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    
    // Obtener categorías únicas
    const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = productService.search(searchQuery);
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortBy, products]);

  const handleAddToCart = (product) => {
    console.log(`${product.name} añadido al carrito`);
  };

  return (
    <div className="products-page">
      <section className="page-title bg-light py-4 mb-4">
        <div className="container">
          <h1 className="display-5">Todos los Productos</h1>
        </div>
      </section>

      <section className="products-list py-4">
        <div className="container">
          {/* Filtros y Búsqueda */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="input-group">
                <span className="input-group-text">
                  🔍
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3 mb-3 mb-md-0">
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Todas las categorías</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Ordenar por nombre</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>

          {/* Resultados */}
          <div className="mb-3">
            <p className="text-muted">
              Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Grid de Productos */}
          {filteredProducts.length > 0 ? (
            <div className="row g-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                  <ProductCard product={product} onAddToCart={handleAddToCart} />
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info text-center">
              <p className="mb-0">No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
