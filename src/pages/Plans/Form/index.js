import React, {useState, useEffect, useMemo} from 'react';
import {MdAdd, MdKeyboardArrowLeft} from 'react-icons/md';
import {Form, Input} from '@rocketseat/unform';
import * as Yup from 'yup';
import {toast} from 'react-toastify';

import {formatPrice} from '~/util/format';
import history from '~/services/history';
import {Container} from '../styles';
import {PrimaryButton, SecondaryButton} from '~/components/Button';
import api from '~/services/api';

const schema = Yup.object().shape({
  title: Yup.string()
    .required()
    .min(3, 'O título do plano precisa conter 3 caracteres'),
  duration: Yup.number()
    .required('A duração é obrigatória')
    .min(1, 'Informe a duração com valor maior ou igual a 1')
    .typeError('Informe um valor válido para a duração'),
  price: Yup.number()
    .required('O preço é obrigatório')
    .typeError('Informe um valor válido para o preço'),
});

export default function EditForm({match}) {
  const id = useMemo(() => match.params.id, [match.params]);
  const mode = id === undefined ? 'create' : 'update';
  const titleMode = id === undefined ? 'Cadastro' : 'Edição';

  const [record, setRecord] = useState({});
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (id === undefined) return;
    console.tron.log(id);
    async function loadRecord() {
      try {
        const response = await api.get(`plans/${id}`);
        const _plan = response.data;
        _plan.totalPriceFormatted = formatPrice(_plan.duration * _plan.price);
        setRecord(_plan);
      } catch (error) {
        console.tron.error(error);
      }
    }

    loadRecord();
  }, [id]);

  async function handleSubmit(data) {
    try {
      if (mode === 'create') {
        await api.post('plans', data);
      } else {
        await api.put(`plans/${id}`, data);
      }
      toast.success(
        `Cadastro ${mode === 'create' ? 'realizado' : 'atualizado'} com sucesso`
      );
      history.push('/plans');
    } catch (error) {
      toast.error('Falha no cadastro, revise os dados');
    }
  }

  function handleDurationChange(value) {
    setDuration(Number(value));
    record.totalPriceFormatted = formatPrice(Number(value) * price);
    document.getElementsByName('totalPriceFormatted')[0].value =
      record.totalPriceFormatted;
    setRecord(record);
  }

  function handlePriceChange(value) {
    setPrice(Number(value));
    record.totalPriceFormatted = formatPrice(duration * Number(value));
    document.getElementsByName('totalPriceFormatted')[0].value =
      record.totalPriceFormatted;
    setRecord(record);
  }

  return (
    <Container>
      <header>
        <strong>{titleMode} de plano</strong>
        <div>
          <aside>
            <SecondaryButton
              type="button"
              onClick={() => {
                history.push('/plans');
              }}>
              <MdKeyboardArrowLeft color="#fff" size={20} />
              <span>VOLTAR</span>
            </SecondaryButton>

            <PrimaryButton type="submit" form="planForm">
              <MdAdd color="#fff" size={20} />
              <span>SALVAR</span>
            </PrimaryButton>
          </aside>
        </div>
      </header>
      <Form
        id="planForm"
        initialData={record}
        schema={schema}
        onSubmit={handleSubmit}>
        <content>
          <Input name="title" label="TÍTULO DO PLANO" />
          <div>
            <div>
              <Input
                name="duration"
                label="DURAÇÃO (em meses)"
                onChange={e => handleDurationChange(e.target.value)}
              />
            </div>
            <div>
              <Input
                name="price"
                label="PREÇO MENSAL"
                onChange={e => handlePriceChange(e.target.value)}
              />
            </div>
            <div>
              <Input
                name="totalPriceFormatted"
                label="PREÇO TOTAL"
                className="disableInput"
                disabled
              />
            </div>
          </div>
        </content>
      </Form>
    </Container>
  );
}
