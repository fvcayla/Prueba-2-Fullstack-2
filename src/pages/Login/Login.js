import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userService } from '../../data/database';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = userService.authenticate(formData.email, formData.password);
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError('Credenciales incorrectas. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="login-page">
      <section className="page-title bg-light py-4 mb-4">
        <div className="container">
          <h1 className="display-5">Iniciar Sesión</h1>
        </div>
      </section>

      <section className="login-content py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4 mx-auto">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                  Entrar
                </button>

                <p className="text-center text-muted">
                  ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>.
                </p>

                <div className="mt-4 p-3 bg-light rounded">
                  <small className="text-muted">
                    <strong>Demo:</strong><br />
                    Admin: admin@techstore.com / admin123<br />
                    Usuario: juan@example.com / user123
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
