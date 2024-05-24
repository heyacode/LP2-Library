// EditerClient.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './clients.css';

const EditerClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState({ nom: '', prenom: '', email: '' });
  const history = useNavigate();

  useEffect(() => {
    axios.get(`/api/v1/client/${id}`)
      .then(response => setClient(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleChange = e => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/v1/client//update/${id}`, client)
      .then(() => history.push(`/clients/${id}`))
      .catch(error => console.error(error));
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit} className='form-client'>
      <h1>Editer Client</h1>
        <div className='dv'>
            <label htmlFor="nom">Nom :</label>
            <input type="text" name="nom" value={client.nom} onChange={handleChange}  placeholder='Nom'/>
        </div>
        <div className='dv'>
          <label htmlFor="prenom">Prenom :</label>
          <input type="text" name="prenom" value={client.prenom} onChange={handleChange} placeholder='Prenom'/>
        </div>
        <div className='dv'> 
          <label htmlFor="email">Email :</label>
          <input type="email" name="email" value={client.email} onChange={handleChange}  placeholder='Email'/>
        </div>
       
       
        <button type="submit" className='ajt'>Enregister</button>
      </form>
    </div>
  );
};

export default EditerClient;
