import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userService } from '../../../data/database';
import './AdminUsers.css';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Verificar si el usuario está logueado y es admin
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    loadUsers();
  }, [navigate]);

  const loadUsers = () => {
    const allUsers = userService.getAll();
    setUsers(allUsers);
  };

  const handleDelete = (id) => {
    // No permitir eliminar el usuario actual
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (currentUser && currentUser.id === parseInt(id)) {
      alert('No puedes eliminar tu propio usuario');
      return;
    }

    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        userService.delete(id);
        loadUsers();
        alert('Usuario eliminado exitosamente');
      } catch (error) {
        alert('Error al eliminar el usuario');
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-users">
      <section className="py-4 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="display-5 mb-0">Gestión de Usuarios</h1>
            <Link to="/admin/usuarios/nuevo" className="btn btn-success">
              + Nuevo Usuario
            </Link>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">🔍</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar usuarios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 text-end">
              <Link to="/admin" className="btn btn-outline-secondary">
                ← Volver al Dashboard
              </Link>
            </div>
          </div>

          {filteredUsers.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Fecha de Creación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString('es-ES')}</td>
                      <td>
                        <Link 
                          to={`/admin/usuarios/editar/${user.id}`}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          Editar
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(user.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info text-center">
              <p className="mb-0">No se encontraron usuarios.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminUsers;
