import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RetournerEmprunt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emprunts, setEmprunt] = useState(null);

  useEffect(() => {
    axios.post(`http://localhost:3003/api/v1/emprunt/${id}`)
      .then(response => {
        setEmprunt(response.data);
        setTimeout(() => {
          navigate('/emprunts');
        }, 3000); 
      })
      .catch(error => {
        console.error(error);
      });
  }, [id, navigate]);

  return (
    <div className='tab-cl'>
        <table className='table'>
          <tr>
            <td colspan="3"><h2 className='h2'>Emprunt Retourné</h2></td>
            </tr>
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
  );
};

export default RetournerEmprunt;
