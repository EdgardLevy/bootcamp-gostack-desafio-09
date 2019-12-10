import React, { useState, useEffect } from 'react';
import { MdAdd, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
// import DatePicker, {registerLocale} from 'react-datepicker';
import { registerLocale } from 'react-datepicker';

import { addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';
// import AsyncSelect from 'react-select/async';
import AsyncSelect from '~/components/ReactSelectAsync';
import DatePicker from '~/components/ReactDatePicker';
import Select from '~/components/ReactSelect';

import history from '~/services/history';
import { Container } from '../styles';
import { PrimaryButton, SecondaryButton } from '~/components/Button';
import api from '~/services/api';
import { formatPrice } from '~/util/format';

registerLocale('pt', pt);

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

export default function EditForm({ match }) {
  console.tron.log(match);
  const { id } = match.params;
  const mode = id === undefined ? 'create' : 'update';
  const titleMode = id === undefined ? 'Cadastro' : 'Edição';

  const [plans, setPlans] = useState([]);
  const [record, setRecord] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (id === undefined) return;
    console.tron.log(id);
    async function loadRecord() {
      try {
        const response = await api.get(`subscriptions/${id}`);
        setRecord(response.data);
        console.tron.log(response);
      } catch (error) {
        console.tron.error(error);
      }
    }

    loadRecord();
  }, [id]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans', {
        params: { page: 1, limit: 100 },
      });

      response.data.records.map(plan => {
        plan.title =
          plan.duration === 1
            ? `${plan.title} (${plan.duration} mês)`
            : `${plan.title} (${plan.duration} meses)`;

        plan.totalPriceFormatted = formatPrice(plan.price * plan.duration);
      });

      setPlans(response.data.records);
    }
    loadPlans();
  }, []);

  useEffect(() => {
    if (!selectedPlan || !startDate) return;

    setEndDate(addMonths(startDate, selectedPlan.duration));
  }, [selectedPlan, startDate]);

  async function handleSubmit(data) {
    const { student_id, plan_id, start_date } = data;

    try {
      if (mode === 'create') {
        await api.post('subscriptions', { student_id, plan_id, start_date });
      } else {
        await api.put(`subscriptions/${id}`, { student_id, plan_id, start_date });
      }

      toast.success(
        `Cadastro ${mode === 'create' ? 'realizado' : 'atualizado'} com sucesso`
      );
      history.push('/subscriptions');
    } catch (error) {
      toast.error('Falha no cadastro, revise os dados');
    }
  }

  const loadOptions = async (inputValue, callback) => {
    const response = await api.get('students', {
      params: { q: inputValue, page: 1, limit: 100 },
    });

    const _students = response.data.records.map(student => ({
      label: student.name,
      value: student.id,
    }));

    callback(_students);
  };

  return (
    <Container>
      <header>
        <strong>{titleMode} de matrícula</strong>
        <div>
          <aside>
            <SecondaryButton
              type="button"
              onClick={() => {
                history.push('/subscriptions');
              }}>
              <MdKeyboardArrowLeft color="#fff" size={20} />
              <span>VOLTAR</span>
            </SecondaryButton>

            <PrimaryButton type="submit" form="subscriptionForm">
              <MdAdd color="#fff" size={20} />
              <span>SALVAR</span>
            </PrimaryButton>
          </aside>
        </div>
      </header>
      {/** onChange={e => setSelectedPlan(Number(e.target.value))} */}

      <Form id="subscriptionForm" initialData={record} onSubmit={handleSubmit}>
        <content>
          <AsyncSelect
            name="student_id"
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            label="ALUNO"
          />

          <table className="formInputs">
            <tbody>
              <tr>
                <td>
                  <Select
                    placeholder="Selecione o plano"
                    name="plan_id"
                    options={plans}
                    label="PLANO"
                    onChange={setSelectedPlan}
                  />
                </td>
                <td>
                  <label htmlFor="start_date">DATA DE INÍCIO</label>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    name="start_date"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    locale="pt"
                  />
                </td>
                <td>
                  <label htmlFor="end_date">DATA DE TÉRMINO</label>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    name="end_date"
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    disabled
                    locale="pt"
                    className="disableInput"
                  />
                </td>
                <td>
                  <Input
                    name="totalPriceFormatted"
                    label="VALOR FINAL"
                    disabled
                    className="disableInput"
                    value={selectedPlan && selectedPlan.totalPriceFormatted}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </content>
      </Form>
    </Container>
  );
}
