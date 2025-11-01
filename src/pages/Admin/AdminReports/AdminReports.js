import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { productService, userService, orderService, categoryService } from '../../../data/database';
import './AdminReports.css';

const AdminReports = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    criticalProducts: 0,
    totalCategories: 0
  });

  useEffect(() => {
    // Verificar si el usuario está logueado y es admin
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    // Calcular estadísticas
    const allProducts = productService.getAll();
    const allUsers = userService.getAll();
    const allOrders = orderService.getAll();
    const allCategories = categoryService.getAll();
    const criticalProducts = productService.getCriticalProducts(15);

    const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = allOrders.length > 0 ? totalRevenue / allOrders.length : 0;

    setStats({
      totalProducts: allProducts.length,
      totalUsers: allUsers.length,
      totalOrders: allOrders.length,
      totalRevenue: totalRevenue,
      averageOrderValue: averageOrderValue,
      criticalProducts: criticalProducts.length,
      totalCategories: allCategories.length
    });
  }, [navigate]);

  return (
    <div className="admin-reports">
      <section className="py-4 bg-light">
        <div className="container">
          <h1 className="display-5">📊 Reportes</h1>
          <p className="lead">Estadísticas y análisis del sistema</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4 mb-4">
            <div className="col-md-6 col-lg-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Productos</h5>
                  <h2 className="display-4 text-primary">{stats.totalProducts}</h2>
                  <Link to="/admin/productos" className="btn btn-sm btn-primary">
                    Ver Productos
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Usuarios</h5>
                  <h2 className="display-4 text-success">{stats.totalUsers}</h2>
                  <Link to="/admin/usuarios" className="btn btn-sm btn-success">
                    Ver Usuarios
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Órdenes</h5>
                  <h2 className="display-4 text-info">{stats.totalOrders}</h2>
                  <Link to="/admin/ordenes" className="btn btn-sm btn-info">
                    Ver Órdenes
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Ingresos</h5>
                  <h2 className="display-6 text-success">${stats.totalRevenue.toFixed(2)}</h2>
                  <small className="text-muted">Total acumulado</small>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Resumen General</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Valor Promedio de Orden:</span>
                      <strong>${stats.averageOrderValue.toFixed(2)}</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Productos Críticos:</span>
                      <strong className="text-warning">{stats.criticalProducts}</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Categorías:</span>
                      <strong>{stats.totalCategories}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Acciones Rápidas</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <Link to="/admin/productos-criticos" className="btn btn-warning">
                      Ver Productos Críticos
                    </Link>
                    <Link to="/admin/categorias" className="btn btn-primary">
                      Gestionar Categorías
                    </Link>
                    <Link to="/admin/ordenes" className="btn btn-info">
                      Ver Todas las Órdenes
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

export default AdminReports;

