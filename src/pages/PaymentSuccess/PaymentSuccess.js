import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  return (
    <div className="payment-success-page">
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card text-center">
                <div className="card-body py-5">
                  <div className="mb-4">
                    <div className="success-icon">✓</div>
                  </div>
                  <h2 className="text-success mb-3">¡Pago Realizado Exitosamente!</h2>
                  <p className="lead mb-4">
                    Tu pedido ha sido procesado correctamente
                  </p>
                  
                  {order && (
                    <div className="alert alert-info text-start mb-4">
                      <h6>Detalles de la Orden:</h6>
                      <p className="mb-1"><strong>Número de Orden:</strong> #{order.id}</p>
                      <p className="mb-1"><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                      <p className="mb-1"><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="mb-0"><strong>Estado:</strong> {order.status === 'completed' ? 'Completada' : order.status}</p>
                    </div>
                  )}

                  <div className="d-flex gap-2 justify-content-center">
                    <Link to="/" className="btn btn-primary">
                      Continuar Comprando
                    </Link>
                    {order && (
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => navigate(`/admin/ordenes/${order.id}`)}
                      >
                        Ver Boleta
                      </button>
                    )}
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

export default PaymentSuccess;

