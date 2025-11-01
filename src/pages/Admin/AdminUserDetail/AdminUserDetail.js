import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { userService, orderService } from '../../../data/database';
import './AdminUserDetail.css';

const AdminUserDetail = () => {
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
      <div className="admin-user-detail">
        <div className="container py-5">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-user-detail">
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

  return (
    <div className="admin-user-detail">
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
              <li className="breadcrumb-item active">{user.name}</li>
            </ol>
          </nav>
          <h1 className="display-5">Detalle de Usuario</h1>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Información Personal</h5>
                </div>
                <div className="card-body">
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Nombre:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Rol:</strong> 
                    <span className={`badge bg-${user.role === 'admin' ? 'danger' : 'primary'} ms-2`}>
                      {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                    </span>
                  </p>
                  {user.createdAt && (
                    <p><strong>Fecha de Registro:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                  )}
                  {user.updatedAt && (
                    <p><strong>Última Actualización:</strong> {new Date(user.updatedAt).toLocaleDateString()}</p>
                  )}

                  <hr />

                  <div className="d-flex gap-2">
                    <Link 
                      to={`/admin/usuarios/editar/${user.id}`}
                      className="btn btn-primary"
                    >
                      Editar Usuario
                    </Link>
                    <Link 
                      to="/admin/usuarios"
                      className="btn btn-secondary"
                    >
                      Volver a Usuarios
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Historial de Compras</h5>
                  <Link 
                    to={`/admin/usuarios/${user.id}/historial`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Ver Completo
                  </Link>
                </div>
                <div className="card-body">
                  {orders.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>ID Orden</th>
                            <th>Total</th>
                            <th>Fecha</th>
                            <th>Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(0, 5).map(order => (
                            <tr key={order.id}>
                              <td>#{order.id}</td>
                              <td>${order.total.toFixed(2)}</td>
                              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                              <td>
                                <Link 
                                  to={`/admin/ordenes/${order.id}`}
                                  className="btn btn-sm btn-primary"
                                >
                                  Ver
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {orders.length > 5 && (
                        <div className="text-center mt-3">
                          <Link 
                            to={`/admin/usuarios/${user.id}/historial`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Ver todas las {orders.length} órdenes
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted mb-0">Este usuario no tiene órdenes registradas</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminUserDetail;

