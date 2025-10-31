import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogService } from '../../data/database';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const postData = blogService.getById(id);
    if (!postData) {
      navigate('/blog');
      return;
    }
    setPost(postData);
  }, [id, navigate]);

  if (!post) {
    return <div className="container py-5">Cargando...</div>;
  }

  return (
    <div className="blog-detail-page">
      <section className="py-5">
        <div className="container">
          <button 
            className="btn btn-outline-secondary mb-4" 
            onClick={() => navigate('/blog')}
          >
            ← Volver al Blog
          </button>
          
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h1 className="display-4 mb-4">{post.title}</h1>
              <p className="text-muted mb-4">
                Por {post.author} • {new Date(post.createdAt).toLocaleDateString('es-ES')}
              </p>
              <img 
                src={post.image.replace('400x250', '800x400')} 
                alt={post.title}
                className="img-fluid rounded mb-4"
              />
              <div className="blog-content">
                <p className="lead">{post.text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
