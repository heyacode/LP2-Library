// EditerLivre.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditerLivre = () => {
  const { id } = useParams();
  const [livre, setLivre] = useState({ titre: '', description: '', auteur: '' });
  const history = useNavigate();

  useEffect(() => {
    axios.get(`/api/v1/livre/${id}`)
      .then(response => setLivre(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleChange = e => {
    setLivre({ ...livre, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`/api/v1/livre/${id}`, livre)
      .then(() => history.push(`/livres/${id}`))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Editer Livre</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="titre" value={livre.titre} onChange={handleChange} />
        <input type="text" name="description" value={livre.description} onChange={handleChange} />
        <input type="text" name="auteur" value={livre.auteur} onChange={handleChange} />
        <button type="submit">Sauvegarder</button>
      </form>
    </div>
  );
};

export default EditerLivre;
