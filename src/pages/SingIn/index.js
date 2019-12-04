import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Form, Input} from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/logo.png';
import {signInRequest} from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SingIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  function handleSubmit({email, password}) {
    dispatch(signInRequest(email, password));
  }
  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
        <img src={logo} alt="GymPoint" />
        <Input
          name="email"
          type="email"
          placeholder="exemplo@gmail.com.br"
          label="SEU E-MAIL"
        />
        <Input
          name="password"
          type="password"
          placeholder="**********"
          label="SUA SENHA"
        />
        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}{' '}
        </button>
      </Form>
    </>
  );
}
