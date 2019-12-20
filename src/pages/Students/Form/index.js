import React, {useState, useEffect} from 'react';
import {MdAdd, MdKeyboardArrowLeft} from 'react-icons/md';
import {Form, Input} from '@rocketseat/unform';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import history from '~/services/history';
import {Container} from '../styles';
import {PrimaryButton, SecondaryButton} from '~/components/Button';
import api from '~/services/api';

const schema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(5),
  email: Yup.string()
    .email()
    .required(),
  age: Yup.number()
    .required()
    .min(0)
    .typeError('Enter a valid value for age'),
  height: Yup.number()
    .required()
    .min(0)
    .typeError('Enter a valid value for height'),

  weight: Yup.number()
    .required()
    .min(0)
    .typeError('Enter a valid value for weight'),
});

export default function EditForm({match}) {
  console.tron.log(match);
  const {id} = match.params;
  const mode = id === undefined ? 'create' : 'update';
  const titleMode = id === undefined ? 'Registration' : 'Edition';

  const [record, setRecord] = useState(null);

  useEffect(() => {
    if (id === undefined) return;
    console.tron.log(id);
    async function loadRecord() {
      try {
        const response = await api.get(`students/${id}`);
        setRecord(response.data);
        console.tron.log(response);
      } catch (error) {
        console.tron.error(error);
      }
    }

    loadRecord();
  }, [id]);

  async function handleSubmit(data) {
    try {
      // console.tron.log(mode);
      // console.tron.log(data);

      if (mode === 'create') {
        await api.post('students', data);
      } else {
        await api.put(`students/${id}`, data);
      }
      // console.tron.log(response);
      toast.success(
        `Cadastro ${mode === 'create' ? 'realizado' : 'atualizado'} com sucesso`
      );
      history.push('/students');
    } catch (error) {
      toast.error('Falha no cadastro, revise os dados');
    }
  }

  return (
    <Container>
      <header>
        <strong>Student {titleMode}</strong>
        <div>
          <aside>
            <SecondaryButton
              type="button"
              onClick={() => {
                history.push('/students');
              }}>
              <MdKeyboardArrowLeft color="#fff" size={20} />
              <span>BACK</span>
            </SecondaryButton>

            <PrimaryButton type="submit" form="studentForm">
              <MdAdd color="#fff" size={20} />
              <span>SAVE</span>
            </PrimaryButton>
          </aside>
        </div>
      </header>
      <Form
        id="studentForm"
        initialData={record}
        schema={schema}
        onSubmit={handleSubmit}>
        <content>
          <Input name="name" placeholder="Full name" label="NAME" />

          <Input
            type="email"
            name="email"
            placeholder="email@provider.com"
            label="E-MAIL"
          />

          <div>
            <div>
              <Input name="age" label="AGE" />
            </div>
            <div>
              <Input name="weight" label="WEIGHT (kg)" />
            </div>
            <div>
              <Input name="height" label="HEIGHT" />
            </div>
          </div>
        </content>
      </Form>
    </Container>
  );
}
