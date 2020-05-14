import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Casos from './pages/Casos';
import NovosCasos from './pages/NovosCasos'

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/cadastro" component={Cadastro} />

        <Route path="/casos" component={Casos} />
        <Route path="/novos/casos" component={NovosCasos} />
      </Switch>
    </BrowserRouter>
  );
}