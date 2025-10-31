import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { productService, userService, blogService } from '../../../data/database';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    blogPosts: 0
  });

  useEffect(() => {
    // Verificar si el usuario está logueado y es admin
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    // Cargar estadísticas
    setStats({
      products: productService.getAll().length,
      users: userService.getAll().length,
      blogPosts: blogService.getAll().length
    });
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <section className="py-4 bg-light">
        <div className="container">
          <h1 className="display-5">Panel de Administración</h1>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Productos</h5>
                  <h2 className="display-4 text-primary">{stats.products}</h2>
                  <Link to="/admin/productos" className="btn btn-primary">
                    Gestionar Productos
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Usuarios</h5>
                  <h2 className="display-4 text-success">{stats.users}</h2>
                  <Link to="/admin/usuarios" className="btn btn-success">
                    Gestionar Usuarios
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Blog Posts</h5>
                  <h2 className="display-4 text-info">{stats.blogPosts}</h2>
                  <button className="btn btn-info" disabled>
                    Próximamente
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Accesos Rápidos</h5>
              <div className="d-flex flex-wrap gap-2">
                <Link to="/admin/productos/nuevo" className="btn btn-outline-primary">
                  Nuevo Producto
                </Link>
                <Link to="/admin/usuarios/nuevo" className="btn btn-outline-success">
                  Nuevo Usuario
                </Link>
                <Link to="/" className="btn btn-outline-secondary">
                  Volver al Sitio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
