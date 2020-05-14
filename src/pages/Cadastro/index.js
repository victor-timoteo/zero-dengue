import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logo from '../../assets/logo.png'

export default function Cadastro() { 
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');

  const history = useHistory();

  async function handlerCadastro(e) {
    e.preventDefault();
  
    const data = {
      nome,
      cpf,
      telefone,
      email,
      nascimento,
      uf,
      cidade,
      bairro,
      rua,
      numero,
      escolaridade,
      tipoUsuario,
    };

    try {
    const response = await api.post('usuarios', data);

    alert(`Cadastro realizado com sucesso. Anote seu ID de acesso: ${response.data.id}`);

    history.push('/');
  }catch (err) {
    alert('Erro no cadastro, tente novamente.')
  }
}

  return(
    <div className="cadastro-container">
      <div className="content">
        <section>
          <img src={logo} alt="Zero Dengue" width="300" style={{padding: 40}}/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, para utilziar a plataforma Zero Dengue, e ajude a combater a dengue</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041"/>
              Logue na aplicação
          </Link>
        </section>

        <form onSubmit={handlerCadastro}>
          <input
            placeholder="Nome completo"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <input 
            placeholder="Informe seu CPF"
            value={cpf}
            onChange={e => setCpf(e.target.value)} 
          />
          <input 
            placeholder="Informe seu Telefone" 
            value={telefone}
            onChange={e => setTelefone(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="Informe seu E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)} 
          />
          <input
            placeholder="Data de nascimento: Ex: 01/01/2000"         
            value={nascimento}
            onChange={e => setNascimento(e.target.value)} 
          />

          <div className="input-group">
            <input
               placeholder="Cidade" 
               value={cidade}
               onChange={e => setCidade(e.target.value)} 
            />
            <input
               placeholder="UF" 
               style={{ width: 80 }} 
               value={uf}
               onChange={e => setUf(e.target.value)} 
            />
          </div>
            <input
               placeholder="Bairro" 
               value={bairro}
               onChange={e => setBairro(e.target.value)} 
            />
          <div className="input-group">
            <input
               placeholder="Rua" 
               value={rua}
               onChange={e => setRua(e.target.value)} 
            />
            <input
             placeholder="N°" 
             style={{ width: 80 }} 
             value={numero}
             onChange={e => setNumero(e.target.value)} 
            />
          </div>
          <input
             placeholder="Escolaridade" 
             value={escolaridade}
             onChange={e => setEscolaridade(e.target.value)} 
          />
          <input 
            placeholder='Tipo de usuario. Ex: "Gestor" '
            value={tipoUsuario}
            onChange={e => setTipoUsuario(e.target.value)} 
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}