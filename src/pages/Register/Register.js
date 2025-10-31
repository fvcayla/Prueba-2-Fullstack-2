import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userService } from '../../data/database';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Verificar si el email ya existe
    const existingUser = userService.getByEmail(formData.email);
    if (existingUser) {
      setError('Este email ya está registrado.');
      return;
    }

    try {
      const newUser = userService.create({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/');
    } catch (err) {
      setError('Error al crear la cuenta. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="register-page">
      <section className="page-title bg-light py-4 mb-4">
        <div className="container">
          <h1 className="display-5">Registrarse</h1>
        </div>
      </section>

      <section className="register-content py-5">
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
                  <label htmlFor="name" className="form-label">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

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
                    minLength="6"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength="6"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                  Registrarse
                </button>

                <p className="text-center text-muted">
                  ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
