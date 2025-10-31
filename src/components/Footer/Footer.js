import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>TechStore</h5>
            <p>Tu tienda de tecnología de confianza desde 2024</p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Inicio</Link></li>
              <li><Link to="/productos" className="text-light text-decoration-none">Productos</Link></li>
              <li><Link to="/nosotros" className="text-light text-decoration-none">Nosotros</Link></li>
              <li><Link to="/contacto" className="text-light text-decoration-none">Contacto</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contacto</h5>
            <p>📧 info@techstore.com</p>
            <p>📞 +56 9 1234 5678</p>
          </div>
        </div>
        <div className="border-top mt-4 pt-3 text-center">
          <p className="mb-0">&copy; 2024 TechStore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
