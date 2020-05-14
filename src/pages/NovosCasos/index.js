import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.png'

export default function NovosCasos() {
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [estado, setEstado] = useState('');
  const [zona, setZona] = useState('');
  const [local, setLocal] = useState('');
  const [terreno, setTerreno] = useState('');

  const history = useHistory();

  const usuarioId = localStorage.getItem('usuarioId');

  async function handleNovoCaso(e) {
    e.preventDefault();

    const data = {
      logradouro,
      numero,
      complemento,
      municipio,
      estado,
      zona,
      local,
      terreno,
    };
    try {
      await api.post('casos', data, {
        headers: {
          Authorization: usuarioId,
        }
      });

      history.push('/casos');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  return (
    <div className="novos-casos-container">
      <div className="content">
        <section>
          <img src={logo} alt="Zero Dengue" width="300" style={{padding: 40}}/>

          <h1>Cadastrar novos casos</h1>
          <p>Cadastre um novo caso e ajude a combater a dengue!</p>

          <Link className="back-link" to="/casos">
            <FiArrowLeft size={16} color="#e02041"/>
              Voltar para os casos
          </Link>
        </section>

        <form onSubmit={handleNovoCaso}>
          <input 
              placeholder="Nome do logradouro: " 
              value={logradouro}
              onChange={e => setLogradouro(e.target.value)}   
          />
          <input 
              placeholder="Número: " 
              value={numero}
              onChange={e => setNumero(e.target.value)}
          />
          <input 
              placeholder="Complemento: " 
              value={complemento}
              onChange={e => setComplemento(e.target.value)}
          />
          <input 
              placeholder="Município: "
              value={municipio}
              onChange={e => setMunicipio(e.target.value)}
          />
          <input 
              placeholder="Estado: " 
              value={estado}
              onChange={e => setEstado(e.target.value)}
          />
          <input 
              placeholder='Zona: Ex: "Zona Rural" '
              value={zona}
              onChange={e => setZona(e.target.value)}
          />
          <input 
              placeholder='Local: Ex: "Residencial" '
              value={local}
              onChange={e => setLocal(e.target.value)}
          />
          <input 
              placeholder='Terreno: Ex: "Edificação Térrea" '
              value={terreno}
              onChange={e => setTerreno(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}