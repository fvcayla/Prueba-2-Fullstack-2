import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { userService, orderService } from '../../../data/database';
import './AdminPurchaseHistory.css';

const AdminPurchaseHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está logueado y es admin
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login');
      return;
    }

    // Cargar usuario
    const userData = userService.getById(id);
    if (userData) {
      setUser(userData);
      // Cargar órdenes del usuario
      const userOrders = orderService.getByUserId(id);
      setOrders(userOrders);
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="admin-purchase-history">
        <div className="container py-5">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-purchase-history">
        <div className="container py-5">
          <div className="alert alert-warning">
            Usuario no encontrado
          </div>
          <Link to="/admin/usuarios" className="btn btn-primary">
            Volver a Usuarios
          </Link>
        </div>
      </div>
    );
  }

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="admin-purchase-history">
      <section className="py-4 bg-light">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Admin</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/admin/usuarios">Usuarios</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/admin/usuarios/${user.id}`}>{user.name}</Link>
              </li>
              <li className="breadcrumb-item active">Historial de Compras</li>
            </ol>
          </nav>
          <h1 className="display-5">Historial de Compras</h1>
          <p className="lead">Historial completo de compras de {user.name}</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-4">
                  <h5>Total de Órdenes</h5>
                  <h2 className="text-primary">{orders.length}</h2>
                </div>
                <div className="col-md-4">
                  <h5>Total Gastado</h5>
                  <h2 className="text-success">${totalSpent.toFixed(2)}</h2>
                </div>
                <div className="col-md-4">
                  <h5>Promedio por Orden</h5>
                  <h2 className="text-info">
                    ${orders.length > 0 ? (totalSpent / orders.length).toFixed(2) : '0.00'}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {orders.length > 0 ? (
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID Orden</th>
                        <th>Productos</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{order.items.length} producto(s)</td>
                          <td>${order.total.toFixed(2)}</td>
                          <td>
                            <span className={`badge bg-${order.status === 'completed' ? 'success' : 'warning'}`}>
                              {order.status === 'completed' ? 'Completada' : order.status}
                            </span>
                          </td>
                          <td>{new Date(order.createdAt).toLocaleString()}</td>
                          <td>
                            <Link 
                              to={`/admin/ordenes/${order.id}`}
                              className="btn btn-sm btn-primary"
                            >
                              Ver Boleta
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
            <div className="alert alert-info">
              Este usuario no tiene órdenes registradas
            </div>
          )}

          <div className="mt-4">
            <Link 
              to={`/admin/usuarios/${user.id}`}
              className="btn btn-secondary"
            >
              Volver a Detalle de Usuario
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPurchaseHistory;

