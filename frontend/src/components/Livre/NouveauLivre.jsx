// NouveauLivre.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const NouveauLivre = () => {
  const [livre, setLivre] = useState({ Code: '', Titre: '', Description: '', Auteur: '' });
  const history = useNavigate();

  const handleChange = e => {
    setLivre({ ...livre, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3002/api/v1/livre/livre', livre)
      .then(() => {
        history.push('/livres');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <h1>Ajouter un Nouveau Livre</h1>
        <div className='dv'>
          <label htmlFor="code">Code :</label>
          <input type="text" name="Code" placeholder="Code" onChange={handleChange} /> <br />
        </div>
        <div className='dv'>
          <label htmlFor="titre">Titre :</label>
          <input type="text" name="Titre" placeholder="Titre" onChange={handleChange} /> <br />
        </div>
        <div className='dv'>
          <label htmlFor="description">Description :</label>
          <input type="text" name="Description" placeholder="Description" onChange={handleChange} /><br />
        </div>
        <div className='dv'>
          <label htmlFor="auteur">Auteur :</label>
          <input type="text" name="Auteur" placeholder="Auteur" onChange={handleChange} /> <br />
        </div>
        <button type="submit" className='ajt'>Ajouter</button>
      </form>
    </div>
  );
};

export default NouveauLivre;
