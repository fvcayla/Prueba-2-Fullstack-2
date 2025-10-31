import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { userService } from '../../../data/database';
import './AdminUserForm.css';

const AdminUserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Verificar si el usuario está logueado y es admin
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    // Si es edición, cargar el usuario
    if (isEdit) {
      const userData = userService.getById(id);
      if (userData) {
        setFormData({
          name: userData.name,
          email: userData.email,
          password: '', // No cargar password
          role: userData.role
        });
      } else {
        navigate('/admin/usuarios');
      }
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.name || !formData.email) {
      setError('Por favor, completa todos los campos requeridos.');
      return;
    }

    if (!isEdit && !formData.password) {
      setError('La contraseña es requerida para nuevos usuarios.');
      return;
    }

    // Verificar si el email ya existe (solo para nuevos usuarios)
    if (!isEdit) {
      const existingUser = userService.getByEmail(formData.email);
      if (existingUser) {
        setError('Este email ya está registrado.');
        return;
      }
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role
    };

    // Solo incluir password si se está creando o si se está editando y se proporcionó uno nuevo
    if (!isEdit || formData.password) {
      userData.password = formData.password;
    }

    try {
      if (isEdit) {
        userService.update(id, userData);
        alert('Usuario actualizado exitosamente');
      } else {
        userService.create(userData);
        alert('Usuario creado exitosamente');
      }
      navigate('/admin/usuarios');
    } catch (error) {
      setError('Error al guardar el usuario. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="admin-user-form">
      <section className="py-4 bg-light">
        <div className="container">
          <h1 className="display-5">
            {isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
          </h1>
        </div>
      </section>

      <section className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="user-form">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre *</label>
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
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isEdit} // No permitir cambiar email al editar
                  />
                  {isEdit && (
                    <small className="text-muted">El email no se puede modificar.</small>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    {isEdit ? 'Nueva Contraseña (dejar vacío para mantener la actual)' : 'Contraseña *'}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!isEdit}
                    minLength={isEdit ? 0 : 6}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="role" className="form-label">Rol *</label>
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success">
                    {isEdit ? 'Actualizar' : 'Crear'} Usuario
                  </button>
                  <Link to="/admin/usuarios" className="btn btn-outline-secondary">
                    Cancelar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminUserForm;
