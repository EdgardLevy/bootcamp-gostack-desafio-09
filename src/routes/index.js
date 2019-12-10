import React from 'react';
import {Switch} from 'react-router-dom';

import Route from './Route';

import SingIn from '~/pages/SingIn';
import SingUp from '~/pages/SingUp';
import Dashboard from '~/pages/Dashboard';

import StudentsGrid from '~/pages/Students/Grid';
import StudentsForm from '~/pages/Students/Form';

import PlansGrid from '~/pages/Plans/Grid';
import PlansForm from '~/pages/Plans/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/register" component={SingUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route path="/students" exact component={StudentsGrid} isPrivate />
      <Route path="/students/create" exact component={StudentsForm} isPrivate />
      <Route path="/students/:id" exact component={StudentsForm} isPrivate />

      <Route path="/plans" exact component={PlansGrid} isPrivate />
      <Route path="/plans/create" exact component={PlansForm} isPrivate />
      <Route path="/plans/:id" exact component={PlansForm} isPrivate />

      {/** Exemplo de rota de 404
      <Route path="/" component={() => <h1>404</h1>} />
       */}
    </Switch>
  );
}
