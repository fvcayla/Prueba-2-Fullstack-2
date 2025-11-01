import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userService } from '../../../data/database';
import './AdminProfile.css';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está logueado y es admin
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login');
      return;
    }

    // Cargar datos del usuario
    const userData = userService.getById(currentUser.id);
    setUser(userData);
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="admin-profile">
        <div className="container py-5">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-profile">
        <div className="container py-5">
          <div className="alert alert-warning">
            Usuario no encontrado
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-profile">
      <section className="py-4 bg-light">
        <div className="container">
          <h1 className="display-5">Perfil de Administrador</h1>
          <p className="lead">Gestiona tu información personal</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="text-center mb-4">
                    <div className="profile-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="mt-3">{user.name}</h3>
                    <p className="text-muted">{user.email}</p>
                  </div>

                  <hr />

                  <div className="mb-3">
                    <strong>ID de Usuario:</strong> {user.id}
                  </div>

                  <div className="mb-3">
                    <strong>Rol:</strong>
                    <span className={`badge bg-danger ms-2`}>
                      Administrador
                    </span>
                  </div>

                  {user.createdAt && (
                    <div className="mb-3">
                      <strong>Miembro desde:</strong> {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  )}

                  {user.updatedAt && (
                    <div className="mb-4">
                      <strong>Última actualización:</strong> {new Date(user.updatedAt).toLocaleDateString()}
                    </div>
                  )}

                  <hr />

                  <div className="d-flex gap-2">
                    <Link 
                      to={`/admin/usuarios/editar/${user.id}`}
                      className="btn btn-primary"
                    >
                      Editar Perfil
                    </Link>
                    <Link 
                      to="/admin"
                      className="btn btn-secondary"
                    >
                      Volver al Dashboard
                    </Link>
                    <button 
                      className="btn btn-outline-danger ms-auto"
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </button>
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

export default AdminProfile;

