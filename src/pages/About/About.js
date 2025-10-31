import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="page-title bg-light py-4 mb-4">
        <div className="container">
          <h1 className="display-5">Nosotros</h1>
        </div>
      </section>

      <section className="about-content py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h2 className="mb-4">Sobre TechStore</h2>
              <p className="lead">
                TechStore es tu tienda de tecnología de confianza desde 2024. 
                Nos dedicamos a ofrecerte los mejores productos tecnológicos 
                al mejor precio, con un servicio excepcional y atención personalizada.
              </p>
              
              <h3 className="mt-5 mb-3">Nuestra Misión</h3>
              <p>
                Nuestra misión es hacer que la tecnología de última generación 
                sea accesible para todos, proporcionando productos de alta calidad 
                y un excelente servicio al cliente.
              </p>

              <h3 className="mt-5 mb-3">Nuestros Valores</h3>
              <ul className="list-unstyled">
                <li className="mb-2">✓ <strong>Calidad:</strong> Solo ofrecemos productos de las mejores marcas</li>
                <li className="mb-2">✓ <strong>Precio:</strong> Los mejores precios del mercado</li>
                <li className="mb-2">✓ <strong>Servicio:</strong> Atención al cliente de primera clase</li>
                <li className="mb-2">✓ <strong>Innovación:</strong> Siempre a la vanguardia tecnológica</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
