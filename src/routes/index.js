import React from 'react';
import {Switch} from 'react-router-dom';

import Route from './Route';

import SingIn from '~/pages/SingIn';
import SingUp from '~/pages/SingUp';
import Dashboard from '~/pages/Dashboard';

import StudentsGrid from '~/pages/Students/Grid';
import StudentsForm from '~/pages/Students/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/register" component={SingUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/students" exact component={StudentsGrid} isPrivate />
      <Route path="/students/create" exact component={StudentsForm} isPrivate />
      <Route path="/students/:id" exact component={StudentsForm} isPrivate />

      {/** Exemplo de rota de 404
      <Route path="/" component={() => <h1>404</h1>} />
       */}
    </Switch>
  );
}
