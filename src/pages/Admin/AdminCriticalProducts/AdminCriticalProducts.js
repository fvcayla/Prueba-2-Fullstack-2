import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { productService } from '../../../data/database';
import './AdminCriticalProducts.css';

const AdminCriticalProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [threshold, setThreshold] = useState(15);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está logueado y es admin
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    // Cargar productos críticos
    loadCriticalProducts();
    setLoading(false);
  }, [navigate, threshold]);

  const loadCriticalProducts = () => {
    const criticalProducts = productService.getCriticalProducts(threshold);
    setProducts(criticalProducts);
  };

  if (loading) {
    return (
      <div className="admin-critical-products">
        <div className="container py-5">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-critical-products">
      <section className="py-4 bg-warning bg-opacity-25">
        <div className="container">
          <h1 className="display-5">⚠️ Listado Productos Críticos</h1>
          <p className="lead">Productos con stock bajo - Requieren atención</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row align-items-end">
                <div className="col-md-6">
                  <label className="form-label">
                    <strong>Umbral de Stock Crítico:</strong>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={threshold}
                    onChange={(e) => setThreshold(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                  <small className="text-muted">
                    Los productos con stock igual o menor a este valor se mostrarán aquí
                  </small>
                </div>
                <div className="col-md-6">
                  <button 
                    className="btn btn-primary"
                    onClick={loadCriticalProducts}
                  >
                    Actualizar Lista
                  </button>
                </div>
              </div>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id} className={product.stock <= 5 ? 'table-danger' : ''}>
                          <td>{product.id}</td>
                          <td>
                            <img 
                              src={product.image} 
                              alt={product.name}
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                          </td>
                          <td>{product.name}</td>
                          <td>{product.category}</td>
                          <td>
                            <span className={`badge bg-${product.stock <= 5 ? 'danger' : 'warning'}`}>
                              {product.stock} unidades
                            </span>
                          </td>
                          <td>${product.price.toFixed(2)}</td>
                          <td>
                            <Link 
                              to={`/admin/productos/${product.id}`}
                              className="btn btn-sm btn-primary me-2"
                            >
                              Ver
                            </Link>
                            <Link 
                              to={`/admin/productos/editar/${product.id}`}
                              className="btn btn-sm btn-warning"
                            >
                              Editar
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-success">
              No hay productos con stock crítico. ¡Todo está bien!
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminCriticalProducts;

