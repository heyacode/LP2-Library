// ClientDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/client/${id}`)
      .then(response => setClient(response.data))
      .catch(error => console.error(error));
  }, [id]);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/v1/client/delete/${id}`)
      .then(() => {
        setClient(client.filter(client => client._id !== id));
      })
      .catch(error => {
        console.error('Error deleting client:', error);
      });
  };
  if (!client) return <div>Chargement...</div>;

  return (
    <div className='tab-cl'>
      <table className='table'>
        <tr>
          <td colspan="4"><h2>Details Du Clients</h2></td>
        </tr>
        <tr >
          <th>Nom</th>
          <th>Prenom</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        <tr>
          <td>{client.nom}</td>
          <td>{client.prenom}</td>
          <td>{client.email}</td>
          <td>
            <Link to={`/clients/${client._id}/editer`}>
              <button className='button-3'>Modifier</button>
            </Link>
            <button onClick={() => handleDelete(client._id)} className='button-4'>Supprimer</button>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default ClientDetail;
