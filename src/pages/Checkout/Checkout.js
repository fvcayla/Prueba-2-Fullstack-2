import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartService, orderService } from '../../data/database';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const items = cartService.get();
    setCartItems(items);
    setTotal(cartService.getTotal());

    // Cargar datos del usuario si está logueado
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        fullName: user.name || ''
      }));
    }

    if (items.length === 0) {
      navigate('/productos');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Nombre completo requerido';
    if (!formData.email.trim()) newErrors.email = 'Email requerido';
    if (!formData.address.trim()) newErrors.address = 'Dirección requerida';
    if (!formData.city.trim()) newErrors.city = 'Ciudad requerida';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Código postal requerido';
    if (!formData.phone.trim()) newErrors.phone = 'Teléfono requerido';
    
    if (formData.paymentMethod === 'credit_card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Número de tarjeta requerido';
      if (!formData.cardName.trim()) newErrors.cardName = 'Nombre en tarjeta requerido';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Fecha de vencimiento requerida';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      const userId = user ? user.id : null;

      if (!userId) {
        alert('Debes iniciar sesión para realizar una compra');
        navigate('/login');
        return;
      }

      const paymentData = {
        method: formData.paymentMethod,
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          phone: formData.phone
        }
      };

      const result = orderService.processPayment(userId, cartItems, paymentData);

      if (result.success) {
        cartService.clear();
        navigate('/pago-correcto', { state: { order: result.order } });
      } else {
        navigate('/pago-error', { state: { error: result.error } });
      }
    } catch (error) {
      navigate('/pago-error', { state: { error: error.message } });
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="checkout-page">
      <section className="py-4 bg-light">
        <div className="container">
          <h1 className="display-5">Finalizar Compra</h1>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Información de Envío y Pago</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Nombre Completo</label>
                      <input
                        type="text"
                        className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                      {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Dirección</label>
                      <input
                        type="text"
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                      {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Ciudad</label>
                        <input
                          type="text"
                          className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        />
                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Código Postal</label>
                        <input
                          type="text"
                          className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                        />
                        {errors.postalCode && <div className="invalid-feedback">{errors.postalCode}</div>}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Teléfono</label>
                      <input
                        type="tel"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>

                    <hr />

                    <div className="mb-3">
                      <label className="form-label">Método de Pago</label>
                      <select
                        className="form-select"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                      >
                        <option value="credit_card">Tarjeta de Crédito</option>
                        <option value="debit_card">Tarjeta de Débito</option>
                        <option value="paypal">PayPal</option>
                      </select>
                    </div>

                    {formData.paymentMethod === 'credit_card' && (
                      <>
                        <div className="mb-3">
                          <label className="form-label">Número de Tarjeta</label>
                          <input
                            type="text"
                            className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                          />
                          {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Nombre en la Tarjeta</label>
                          <input
                            type="text"
                            className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                          />
                          {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Fecha de Vencimiento</label>
                            <input
                              type="text"
                              className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              placeholder="MM/AA"
                            />
                            {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">CVV</label>
                            <input
                              type="text"
                              className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              placeholder="123"
                            />
                            {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                          </div>
                        </div>
                      </>
                    )}

                    <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
                      {loading ? 'Procesando...' : 'Confirmar Compra'}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Resumen de Compra</h5>
                  <hr />
                  {cartItems.map(item => (
                    <div key={item.productId} className="d-flex justify-content-between mb-2">
                      <span>{item.product.name} x{item.quantity}</span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>${total.toFixed(2)}</strong>
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

export default Checkout;

