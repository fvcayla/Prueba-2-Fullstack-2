import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cartService } from '../../data/database';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Actualizar contador del carrito
    const updateCartCount = () => {
      setCartCount(cartService.getCount());
    };
    updateCartCount();

    // Verificar si hay usuario logueado
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);

    // Escuchar cambios en el carrito (simulación)
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
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
              <div className="cart-icon position-relative">
                <span className="fs-4">🛒</span>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
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
