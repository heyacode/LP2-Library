// LivreDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const LivreDetail = () => {
  const { id } = useParams();
  const [livre, setLivre] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3002/api/v1/livre/${id}`)
      .then(response => setLivre(response.data))
      .catch(error => console.error(error));
  }, [id]);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/api/v1/livre/delete/${id}`)
      .then(() => {
        setLivre(livre.filter(livre => livre._id !== id));
      })
      .catch(error => {
        console.error('Error deleting livre:', error);
      });
  };

  if (!livre) return <div>Chargement...</div>;

  return (
    <div className='details'>
      <div className='tab-cl'>
        <table className='table'>
          <tr>
            <td colspan="4"><h2>Details du Livres</h2></td>
          </tr>
          <tr >
            <th>Code</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Auteur</th>
            <th>Action</th>
          </tr>

          <tr key={livre._id}>
            <td>{livre.Code}</td>
            <td>{livre.Titre}</td>
            <td>{livre.Description}</td>
            <td>{livre.Auteur}</td>
            <td>
              <Link to={`/livres/${livre._id}/editer`}>
                <button className='button-3'>Modifier</button>
              </Link>
              <button onClick={() => handleDelete(livre._id)} className='button-4'>Supprimer</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default LivreDetail;
