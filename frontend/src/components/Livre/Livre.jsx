// Livres.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Livres = () => {
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/api/v1/livre')
      .then(response => setLivres(response.data))
      .catch(error => console.error(error));
  }, []);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/api/v1/livre/delete/${id}`)
      .then(() => {
        setLivres(livres.filter(livre => livre._id !== id));
      })
      .catch(error => {
        console.error('Error deleting livre:', error);
      });
  };
  return (
    <div>

      <div className='tab-cl'>
        <table className='table'>
          <tr>
            <td colspan="3"><h2>Liste des Livres</h2></td>
            <td><button className='ajt'><Link to="/livres/nouveau" className='link'>Ajouter un Nouveau Livre</Link></button></td></tr>
          <tr >
            <th>Code</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Auteur</th>
            <th>Action</th>
          </tr>
          {livres.map(livre => (
            <tr>
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
          ))}
        </table>
      </div>
    </div>
  );
};

export default Livres;
