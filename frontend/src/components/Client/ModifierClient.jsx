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
    <h2>Edit Reader :{client.nom} {client.prenom}</h2>
  <table>
    <tbody>
      <tr>
        <td>
          <label htmlFor="prenom">First Name :</label>
        </td>
        <td>
          <input type="text" name="prenom" value={client.prenom} onChange={handleChange} placeholder='First Name' />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="nom">Last Name :</label>
        </td>
        <td>
          <input type="text" name="nom" value={client.nom} onChange={handleChange} placeholder='Last Name' />
        </td>
      </tr>
      
      <tr>
        <td>
          <label htmlFor="email">Email :</label>
        </td>
        <td>
          <input type="email" name="email" value={client.email} onChange={handleChange} placeholder='Email' />
        </td>
      </tr>
      <tr>
        <td></td>
        <td colSpan={2}>
        <button type="submit" className='ajt'>Save</button>
        </td>
      </tr>
    </tbody>
  </table>
</form>

    </div>
  );
};

export default EditerClient;
