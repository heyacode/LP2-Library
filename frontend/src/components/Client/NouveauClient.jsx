// NouveauClient.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './clients.css';

const NouveauClient = () => {
  const [client, setClient] = useState({ nom: '', prenom: '', email: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form submitted:', client); 
    axios.post('http://localhost:3001/api/v1/client/add', client)
      .then(response => {
        console.log('Response:', response); 
        navigate('/clients');
      })
      .catch(error => {
        console.error('Error:', error); 
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Ajouter un Nouveau Client</h1>
        <div className='dv'>
          <label htmlFor="nom">Nom :</label>
          <input type="text" name="nom" placeholder="Nom" value={client.nom} onChange={handleChange} required />
        </div>
        <div className="dv">
          <label htmlFor="prenom">Prenom :</label>
          <input type="text" name="prenom" placeholder="Prenom" value={client.prenom} onChange={handleChange} required />
        </div>
        <div className='dv'>
          <label htmlFor="email">Email :</label>
          <input type="email" name="email" placeholder="Email" value={client.email} onChange={handleChange} required />
        </div>
        <button type="submit" className='ajt'>Ajouter</button>
      </form>
    </div>
  );
};

export default NouveauClient;
