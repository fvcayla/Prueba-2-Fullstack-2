import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cartService } from '../../data/database';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  const updateCart = () => {
    const items = cartService.get();
    setCartItems(items);
    setCartCount(cartService.getCount());
    setCartTotal(cartService.getTotal());
  };

  useEffect(() => {
    // Actualizar contador del carrito
    updateCart();

    // Verificar si hay usuario logueado
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);

    // Escuchar cambios en el carrito (simulación)
    const interval = setInterval(updateCart, 1000);
    
    // Cerrar dropdown al hacer clic fuera
    const handleClickOutside = (event) => {
      if (showCartDropdown && !event.target.closest('.cart-dropdown')) {
        setShowCartDropdown(false);
      }
    };

    if (showCartDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location, showCartDropdown]);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const handleRemoveFromCart = (productId) => {
    cartService.remove(productId);
    updateCart();
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    cartService.updateQuantity(productId, newQuantity);
    updateCart();
  };

  const handleCartIconClick = (e) => {
    e.preventDefault();
    setShowCartDropdown(!showCartDropdown);
  };

  const handleCheckout = () => {
    setShowCartDropdown(false);
    navigate('/comprar');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img 
              src="https://via.placeholder.com/120x40/2c3e50/ffffff?text=TechStore" 
              alt="TechStore" 
              height="40"
            />
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/')}`} to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/productos')}`} to="/productos">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/blog')}`} to="/blog">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/nosotros')}`} to="/nosotros">Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/contacto')}`} to="/contacto">Contacto</Link>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-3">
              {isLoggedIn ? (
                <>
                  <Link className="btn btn-outline-light btn-sm" to="/admin">
                    Admin
                  </Link>
                  <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link className="btn btn-outline-light btn-sm" to="/login">
                    Iniciar Sesión
                  </Link>
                  <Link className="btn btn-primary btn-sm" to="/registro">
                    Registrarse
                  </Link>
                </>
              )}
              <div className="cart-dropdown position-relative">
                <div 
                  className="cart-icon position-relative" 
                  onClick={handleCartIconClick}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="fs-4">🛒</span>
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </div>
                
                {showCartDropdown && (
                  <div className="cart-dropdown-menu">
                    <div className="card shadow-lg" style={{ minWidth: '350px', maxHeight: '500px' }}>
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Carrito de Compras</h6>
                        <button 
                          className="btn-close" 
                          onClick={() => setShowCartDropdown(false)}
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="card-body p-0" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {cartItems.length > 0 ? (
                          <>
                            {cartItems.map(item => (
                              <div key={item.productId} className="d-flex p-3 border-bottom">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name}
                                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                                  className="me-3"
                                />
                                <div className="flex-grow-1">
                                  <h6 className="mb-1" style={{ fontSize: '0.9rem' }}>{item.product.name}</h6>
                                  <p className="mb-1 text-muted" style={{ fontSize: '0.8rem' }}>
                                    ${item.product.price.toFixed(2)} x {item.quantity}
                                  </p>
                                  <div className="d-flex align-items-center gap-2">
                                    <button
                                      className="btn btn-sm btn-outline-secondary"
                                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                                    >
                                      -
                                    </button>
                                    <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                                    <button
                                      className="btn btn-sm btn-outline-secondary"
                                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                                    >
                                      +
                                    </button>
                                    <button
                                      className="btn btn-sm btn-danger ms-auto"
                                      onClick={() => handleRemoveFromCart(item.productId)}
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="p-4 text-center text-muted">
                            <p className="mb-0">Tu carrito está vacío</p>
                          </div>
                        )}
                      </div>
                      {cartItems.length > 0 && (
                        <div className="card-footer">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <strong>Total:</strong>
                            <strong className="text-primary fs-5">${cartTotal.toFixed(2)}</strong>
                          </div>
                          <button 
                            className="btn btn-primary w-100"
                            onClick={handleCheckout}
                          >
                            Ir a Pagar
                          </button>
                          <Link 
                            to="/productos"
                            className="btn btn-outline-secondary w-100 mt-2"
                            onClick={() => setShowCartDropdown(false)}
                          >
                            Seguir Comprando
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
