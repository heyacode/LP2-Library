import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Emprunts = () => {
  const [emprunts, setEmprunt] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/api/v1/emprunt')
      .then(response => setEmprunt(response.data))
      .catch(error => console.error(error));
  }, []);
  return (
    <div>

      <div className='tab-cl'>
        <table className='table'>
          <tr>
            <td colspan="3"><h2>Liste des emprunts</h2></td>
            <td><button className='ajt'><Link to="/emprunts/nouveau" className='link'>Ajouter un Nouveau Emprunt</Link></button></td></tr>
          <tr >
            <th>Code Livre</th>
            <th>Nom Client</th>
            <th>Date d'Emprunt</th>
            <th>Date de Retour</th>
          </tr>
          {emprunts.map(emprunt => (
            <tr>
              <td>{emprunt.code_client}</td>
              <td>{emprunt.nom}</td>
              <td>{emprunt.dateEmprunt}</td>
              <td>{emprunt.dateRetour}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Emprunts;
