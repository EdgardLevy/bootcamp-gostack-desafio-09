import React, {useState, useEffect} from 'react';
import {MdAdd, MdKeyboardArrowLeft} from 'react-icons/md';
import {Form, Input} from '@rocketseat/unform';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import history from '~/services/history';
import {Container} from '../styles';
import {PrimaryButton, SecondaryBytton} from '~/components/Button';
import api from '~/services/api';

const schema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(5, 'O nome precisa conter 5 caracteres'),
  email: Yup.string()
    .email()
    .required('O email é obrigatório'),
  age: Yup.number()
    .required('Idade é obrigatória')
    .min(0, 'Informe a com valor maior ou acima de 0 (zero)')
    .typeError('Informe um valor válido para a idade'),
  height: Yup.number()
    .required('A altura é obrigatória')
    .min(0, 'Informe o altura com valor acima de 0 (zero)')
    .typeError('Informe um valor válido para a altura'),

  weight: Yup.number()
    .required('O peso é obrigatório')
    .min(0, 'Informe o altura com valor acima de 0 (zero)')
    .typeError('Informe um valor válido para o peso'),
});

export default function Create({match}) {
  console.tron.log(match);

  const [id, setId] = useState(match.params.id);

  const [mode, setMode] = useState(id === undefined ? 'create' : 'update');

  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (id === undefined) return;
    console.tron.log(id);
    async function loadStudent() {
      try {
        const response = await api.get(`students/${id}`);
        setStudent(response.data);
        console.tron.log(response);
      } catch (error) {
        console.tron.error(error);
      }
    }

    loadStudent();
  }, [id]);

  function handleSubmit(data) {
    try {
      console.tron.log(mode);
      console.tron.log(data);
      let response;
      if (mode === 'create') response = api.post('students', {body: data});
      else response = api.put(`students/${id}`, {body: data});
      console.tron.log(response);
      toast.success('Cadastro realizado com sucesso');
      history.push('/students');
    } catch (error) {
      toast.error('Falha no cadastro, revise os dados');
    }
  }

  return (
    <Container>
      <Form initialData={student} schema={schema} onSubmit={handleSubmit}>
        <header>
          <strong>Cadastro de Aluno</strong>
          <div>
            <aside>
              <SecondaryBytton
                type="button"
                onClick={() => {
                  history.push('/students');
                }}>
                <MdKeyboardArrowLeft color="#fff" size={20} />
                <span>VOLTAR</span>
              </SecondaryBytton>

              <PrimaryButton type="submit">
                <MdAdd color="#fff" size={20} />
                <span>SALVAR</span>
              </PrimaryButton>
            </aside>
          </div>
        </header>
        <Input
          id="name"
          name="name"
          placeholder="Nome completo"
          label="NOME COMPLETO"
        />

        <Input
          id="email"
          type="email"
          name="email"
          placeholder="exemplo@email.com"
          label="ENDEREÇO DE E-EMAIL"
        />

        <div>
          <div>
            <Input name="age" label="IDADE" />
          </div>
          <div>
            <Input name="weight" label="PESO (em kg)" />
          </div>
          <div>
            <Input name="height" label="Altura" />
          </div>
        </div>
      </Form>
    </Container>
  );
}
