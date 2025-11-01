import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './PaymentError.css';

const PaymentError = () => {
  const location = useLocation();
  const error = location.state?.error || 'Ocurrió un error durante el procesamiento del pago';

  return (
    <div className="payment-error-page">
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card text-center">
                <div className="card-body py-5">
                  <div className="mb-4">
                    <div className="error-icon">✗</div>
                  </div>
                  <h2 className="text-danger mb-3">Error en el Pago</h2>
                  <p className="lead mb-4">
                    {error}
                  </p>
                  <p className="mb-4">
                    Por favor, verifica tus datos e intenta nuevamente.
                  </p>
                  
                  <div className="d-flex gap-2 justify-content-center">
                    <Link to="/comprar" className="btn btn-primary">
                      Intentar Nuevamente
                    </Link>
                    <Link to="/productos" className="btn btn-outline-secondary">
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

export default PaymentError;

