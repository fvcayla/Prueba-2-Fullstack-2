import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { productService } from '../../../data/database';
import './AdminProducts.css';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Verificar si el usuario está logueado y es admin
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    loadProducts();
  }, [navigate]);

  const loadProducts = () => {
    const allProducts = productService.getAll();
    setProducts(allProducts);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        productService.delete(id);
        loadProducts();
        alert('Producto eliminado exitosamente');
      } catch (error) {
        alert('Error al eliminar el producto');
      }
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-products">
      <section className="py-4 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="display-5 mb-0">Gestión de Productos</h1>
            <Link to="/admin/productos/nuevo" className="btn btn-primary">
              + Nuevo Producto
            </Link>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">🔍</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 text-end">
              <Link to="/admin" className="btn btn-outline-secondary">
                ← Volver al Dashboard
              </Link>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          className="rounded"
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td>
                        <Link 
                          to={`/admin/productos/editar/${product.id}`}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          Editar
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info text-center">
              <p className="mb-0">No se encontraron productos.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminProducts;
