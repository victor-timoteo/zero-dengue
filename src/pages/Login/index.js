import React,{ useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.png'
import dengue from '../../assets/dengue-login.png';

export default function Login() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try{
      const response = await api.post('login', { id });

      localStorage.setItem('usuarioId', id);
      localStorage.setItem('usuarioNome', response.data.nome);

      history.push('/casos');
    }catch(err) {
      alert('Falha no login, tente novamente.')
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <img src={logo} alt="Zero Dengue" width="250 " style={{padding: 40}}/>
          <h1>Faça seu login</h1>

          <input 
            placeholder="Seu ID de cadastro"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/cadastro">
            <FiLogIn size={16} color="#e02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={dengue} width="400" alt="Zero Dengue"/>
    </div>
  );
}