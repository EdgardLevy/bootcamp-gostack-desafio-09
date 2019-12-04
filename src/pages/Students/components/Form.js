import React from 'react';
import {Form, Input} from '@rocketseat/unform';
import {useDispatch, useSelector} from 'react-redux';
import api from '~/services/api';
import {storeFields} from '~/store/modules/student/actions';

export default function StudentForm({action, id}) {
  const dispatch = useDispatch();

  // const name = useSelector(state => state.student.name);

  function handleInputChange() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    dispatch(storeFields({name, email, age, weight, height}));
  }

  return (
    <Form>
      <Input
        id="name"
        name="name"
        placeholder="Nome completo"
        label="NOME COMPLETO"
        onChange={handleInputChange}
      />

      <Input
        id="email"
        type="email"
        name="email"
        placeholder="exemplo@email.com"
        label="ENDEREÇO DE E-EMAIL"
        onChange={handleInputChange}
      />

      <div>
        <div>
          <Input
            id="age"
            name="age"
            label="IDADE"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Input
            id="weight"
            name="weight"
            label="PESO (em kg)"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Input
            id="height"
            name="height"
            label="Altura"
            onChange={handleInputChange}
          />
        </div>
      </div>
    </Form>
  );
}
