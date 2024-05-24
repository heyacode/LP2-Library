// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Livres from './components/Livre/Livre';
import DetailsLivre from './components/Livre/DetailsLivre';
import NouveauLivre from './components/Livre/NouveauLivre';
import ModifierLivre from './components/Livre/ModifierLivre';
import Clients from './components/Client/Client';
import DetailsClient from './components/Client/DetailsClient';
import NouveauClient from './components/Client/NouveauClient';
import ModifierClient from './components/Client/ModifierClient';
import Emprunts from './components/Emprunt/Emprunt';
import NouveauEmprunt from './components/Emprunt/NouveauEmprunt';
import RetourneEmprunt from './components/Emprunt/RetourneEmprunt';
import Header from './components/Header/Header';
import Home from './components/Header/Home';



function App() {
  return (
      
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/livres" element={<Livres />} />
        <Route path="livres/nouveau" element={<NouveauLivre />} />
        <Route path="/livres/:id" element={<DetailsLivre />} />
        <Route path="/livres/:id/editer" element={<ModifierLivre />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/nouveau" element={<NouveauClient />} />
        <Route path="/clients/:id" element={<DetailsClient />} />
        <Route path="/clients/:id/editer" element={<ModifierClient />} />
        <Route path="/emprunts" element={<Emprunts />} />
        <Route path="/emprunts/nouveau" element={<NouveauEmprunt />} />
        <Route path="/emprunts/:id/retourner" element={<RetourneEmprunt />} />
      </Routes>
    </Router>

  );
}

export default App;
