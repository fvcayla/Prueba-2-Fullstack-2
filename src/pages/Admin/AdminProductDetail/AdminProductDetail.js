import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productService } from '../../../data/database';
import './AdminProductDetail.css';

const AdminProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está logueado y es admin
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    // Cargar producto
    const productData = productService.getById(id);
    setProduct(productData);
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="admin-product-detail">
        <div className="container py-5">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="admin-product-detail">
        <div className="container py-5">
          <div className="alert alert-warning">
            Producto no encontrado
          </div>
          <Link to="/admin/productos" className="btn btn-primary">
            Volver a Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-product-detail">
      <section className="py-4 bg-light">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Admin</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/admin/productos">Productos</Link>
              </li>
              <li className="breadcrumb-item active">{product.name}</li>
            </ol>
          </nav>
          <h1 className="display-5">Detalle de Producto</h1>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '400px', objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <hr />
                  
                  <div className="mb-3">
                    <strong>Precio:</strong> ${product.price.toFixed(2)}
                  </div>
                  
                  <div className="mb-3">
                    <strong>Categoría:</strong> {product.category}
                  </div>
                  
                  <div className="mb-3">
                    <strong>Stock:</strong> 
                    <span className={`badge bg-${product.stock > 15 ? 'success' : 'warning'} ms-2`}>
                      {product.stock} unidades
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <strong>Descripción:</strong>
                    <p className="mt-2">{product.description}</p>
                  </div>

                  {product.createdAt && (
                    <div className="mb-3">
                      <strong>Creado:</strong> {new Date(product.createdAt).toLocaleDateString()}
                    </div>
                  )}

                  {product.updatedAt && (
                    <div className="mb-3">
                      <strong>Actualizado:</strong> {new Date(product.updatedAt).toLocaleDateString()}
                    </div>
                  )}

                  <hr />

                  <div className="d-flex gap-2">
                    <Link 
                      to={`/admin/productos/editar/${product.id}`}
                      className="btn btn-primary"
                    >
                      Editar Producto
                    </Link>
                    <Link 
                      to="/admin/productos"
                      className="btn btn-secondary"
                    >
                      Volver a Productos
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminProductDetail;

