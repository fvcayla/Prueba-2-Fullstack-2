import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { orderService } from '../../../data/database';
import './AdminOrders.css';

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está logueado y es admin
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    // Cargar órdenes
    const allOrders = orderService.getAll();
    setOrders(allOrders);
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="admin-orders">
        <div className="container py-5">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders">
      <section className="py-4 bg-light">
        <div className="container">
          <h1 className="display-5">Órdenes / Boletas</h1>
          <p className="lead">Gestiona todas las órdenes y boletas del sistema</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {orders.length > 0 ? (
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Usuario</th>
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
                          <td>Usuario ID: {order.userId}</td>
                          <td>${order.total.toFixed(2)}</td>
                          <td>
                            <span className={`badge bg-${order.status === 'completed' ? 'success' : 'warning'}`}>
                              {order.status === 'completed' ? 'Completada' : order.status}
                            </span>
                          </td>
                          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
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
              No hay órdenes registradas aún
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminOrders;

