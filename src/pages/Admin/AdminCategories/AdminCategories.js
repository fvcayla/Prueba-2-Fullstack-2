import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { categoryService, productService } from '../../../data/database';
import './AdminCategories.css';

const AdminCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está logueado y es admin
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    loadCategories();
    setLoading(false);
  }, [navigate]);

  const loadCategories = () => {
    const allCategories = categoryService.getAll();
    setCategories(allCategories);

    // Contar productos por categoría
    const stats = {};
    allCategories.forEach(category => {
      const products = productService.getByCategory(category.name);
      stats[category.id] = products.length;
    });
    setCategoryStats(stats);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      try {
        categoryService.delete(id);
        loadCategories();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-categories">
        <div className="container py-5">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-categories">
      <section className="py-4 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-5">Gestión de Categorías</h1>
              <p className="lead">Administra las categorías de productos</p>
            </div>
            <Link to="/admin/categorias/nuevo" className="btn btn-primary">
              Nueva Categoría
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {categories.length > 0 ? (
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Productos</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(category => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                          <td>{category.description}</td>
                          <td>
                            <span className="badge bg-primary">
                              {categoryStats[category.id] || 0}
                            </span>
                          </td>
                          <td>
                            <Link 
                              to={`/admin/categorias/editar/${category.id}`}
                              className="btn btn-sm btn-warning me-2"
                            >
                              Editar
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(category.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-info">
              No hay categorías registradas. 
              <Link to="/admin/categorias/nuevo" className="ms-2">
                Crear primera categoría
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminCategories;

