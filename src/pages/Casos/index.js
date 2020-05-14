import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.png'

export default function Profile() {
  const [casos, setCasos] = useState([]);
  
  
  const history = useHistory();
  const usuarioId = localStorage.getItem('usuarioId');
  const usuarioNome = localStorage.getItem('usuarioNome');


  useEffect(() => {
    api.get('casos', {
      headers: {
        Authorization: usuarioId,
      }
    }).then(response => {
      setCasos(response.data);
    })
  }, [usuarioId]);

  async function handleDeleteCasos(id) {
    try {
      await api.delete(`casos/${id}`,{
        headers: {
          Authorization: usuarioId,
        }
      });
      setCasos(casos.filter(casos => casos.id !== id));
    }catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
      <img src={logo} alt="Zero Dengue" width="150" /> 
      <span>Bem vindo(a), {usuarioNome}</span>

      <Link className="button" to="/novos/casos">Cadastrar novos Casos</Link> 
      <button onClick={handleLogout} type="button">
        <FiPower size={18} color="#e02041" />
      </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
          {casos.map(casos => (

            <li key={casos.id}>
            <strong>CASO: {casos.id}</strong>
            <p>Logadouro: {casos.logradouro} </p> 
            <p>Número: {casos.numero}</p> 
            <p>Complemento: {casos.complemento}</p> 
            <p>Municipio: {casos.municipio}</p> 
            <p>Estado: {casos.estado}</p> 
            <p>Zona: {casos.zona}</p> 
            <p>Tipo do Local: {casos.local}</p> 
            <p>Terreno: {casos.terreno}</p> 
            <button onClick={() => handleDeleteCasos(casos.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
