// NouveauEmprunt.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NouveauEmprunt = () => {
  const [emprunt, setEmprunt] = useState({ code_livre: '', nom: '' });
  const history = useNavigate();

  const handleChange = e => {
    setEmprunt({ ...emprunt, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3003/api/v1/emprunt/add', emprunt)
      .then(() => {
        history.push('/emprunts');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <h1>Ajouter un Nouvel Emprunt</h1>
        <div className='dv'>
          <label htmlFor="code_livre">Code Livre :</label>
          <input type="text" name="code_livre" placeholder="Code Livre" onChange={handleChange} />

        </div>
        <div className='dv'>
          <label htmlFor="nom">Nom Client :</label>
          <input type="text" name="nom" placeholder="Nom Client" onChange={handleChange} />

        </div>

        <button type="submit" className='ajt'>Ajouter</button>
      </form>

    </div>
  );
};

export default NouveauEmprunt;
