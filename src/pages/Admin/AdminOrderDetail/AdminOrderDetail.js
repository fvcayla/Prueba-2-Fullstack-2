import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { orderService, userService } from '../../../data/database';
import './AdminOrderDetail.css';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está logueado y es admin
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login');
      return;
    }

    // Cargar orden
    const orderData = orderService.getById(id);
    if (orderData) {
      setOrder(orderData);
      const userData = userService.getById(orderData.userId);
      setUser(userData);
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="admin-order-detail">
        <div className="container py-5">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="admin-order-detail">
        <div className="container py-5">
          <div className="alert alert-warning">
            Orden no encontrada
          </div>
          <Link to="/admin/ordenes" className="btn btn-primary">
            Volver a Órdenes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-order-detail">
      <section className="py-4 bg-light">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Admin</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/admin/ordenes">Órdenes</Link>
              </li>
              <li className="breadcrumb-item active">Boleta #{order.id}</li>
            </ol>
          </nav>
          <h1 className="display-5">Boleta de Compra #{order.id}</h1>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Detalles de la Orden</h5>
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>${item.subtotal.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan="3" className="text-end">Total:</th>
                        <th>${order.total.toFixed(2)}</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Información de Cliente</h5>
                </div>
                <div className="card-body">
                  {user ? (
                    <>
                      <p><strong>Nombre:</strong> {user.name}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                    </>
                  ) : (
                    <p>Usuario ID: {order.userId}</p>
                  )}
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Información de Pago</h5>
                </div>
                <div className="card-body">
                  <p><strong>Método:</strong> {order.paymentMethod === 'credit_card' ? 'Tarjeta de Crédito' : order.paymentMethod}</p>
                  <p><strong>Estado:</strong> 
                    <span className={`badge bg-${order.status === 'completed' ? 'success' : 'warning'} ms-2`}>
                      {order.status === 'completed' ? 'Completada' : order.status}
                    </span>
                  </p>
                  <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                  
                  {order.shippingAddress && Object.keys(order.shippingAddress).length > 0 && (
                    <>
                      <hr />
                      <h6>Dirección de Envío:</h6>
                      <p className="mb-0">
                        {order.shippingAddress.fullName}<br />
                        {order.shippingAddress.address}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <button 
                  className="btn btn-secondary w-100"
                  onClick={() => window.print()}
                >
                  Imprimir Boleta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminOrderDetail;

