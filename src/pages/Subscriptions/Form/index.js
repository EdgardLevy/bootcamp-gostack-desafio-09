import React, {useState, useEffect, useMemo} from 'react';
import {MdAdd, MdKeyboardArrowLeft} from 'react-icons/md';
import {Form, Input} from '@rocketseat/unform';

import * as Yup from 'yup';
import {toast} from 'react-toastify';
// import DatePicker, {registerLocale} from 'react-datepicker';
import {registerLocale} from 'react-datepicker';

import {addMonths, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';
// import AsyncSelect from 'react-select/async';
import AsyncSelect from '~/components/ReactSelectAsync';
import DatePicker from '~/components/ReactDatePicker';
import Select from '~/components/ReactSelect';

import history from '~/services/history';
import {Container} from '../styles';
import {PrimaryButton, SecondaryButton} from '~/components/Button';
import api from '~/services/api';
import {formatPrice} from '~/util/format';

registerLocale('pt', pt);

const schema = Yup.object().shape({
  student_id: Yup.number()
    .typeError('Selecione um aluno')
    .required(),
  plan_id: Yup.number()
    .typeError('Selecione um plano typerror')
    .required(),
  start_date: Yup.date()
    .typeError('Informe a data de início')
    .required(),
});

export default function EditForm({match}) {
  // console.tron.log(match);

  const id = useMemo(() => match.params.id, [match.params]);
  const mode = id === undefined ? 'create' : 'update';
  const titleMode = id === undefined ? 'Cadastro' : 'Edição';

  const [plans, setPlans] = useState([]);
  const [record, setRecord] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(null);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    if (id === undefined) return;

    async function loadRecord() {
      console.tron.log('load subscription');
      try {
        const response = await api.get(`subscriptions/${id}`);
        const start_date = parseISO(response.data.start_date);
        const plan_id = response.data.plan.id;
        const {student} = response.data;

        const _plan = plans.find(plan => plan.id === plan_id);
        setSelectedPlan(_plan);
        setStartDate(start_date);
        setSelectedStudent({value: student.id, label: student.name});

        console.tron.log('student', student);
        const r = {};
        console.tron.log('record', r);
        setRecord(r);

        console.tron.log(response);
      } catch (error) {
        console.tron.error(error);
      }
    }

    loadRecord();
  }, [id, plans]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans', {
        params: {page: 1, limit: 100},
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

  // useEffect(() => {
  //   if (!selectedPlan || !startDate) return;

  //   setEndDate(addMonths(startDate, selectedPlan.duration));
  // }, [selectedPlan, startDate]);

  async function handleSubmit(data) {
    console.tron.log('handleSubmit', data);
    const {student_id, plan_id, start_date} = data;

    try {
      if (mode === 'create') {
        await api.post('subscriptions', {student_id, plan_id, start_date});
      } else {
        await api.put(`subscriptions/${id}`, {student_id, plan_id, start_date});
      }

      toast.success(
        `Cadastro ${mode === 'create' ? 'realizado' : 'atualizado'} com sucesso`
      );
      history.push('/subscriptions');
    } catch (error) {
      console.tron.error(error);
      toast.error('Falha no cadastro, revise os dados');
    }
  }

  async function loadStudents(inputValue) {
    console.tron.log('loadStudents');
    const response = await api.get('students', {
      params: {q: inputValue, page: 1, limit: 100},
    });

    return response.data.records.map(student => ({
      label: student.name,
      value: student.id,
    }));
  }

  const totalPriceFormatted = useMemo(() => {
    if (selectedPlan) {
      return formatPrice(selectedPlan.duration * selectedPlan.price);
    }
    return '';
  }, [selectedPlan]);

  const endDate = useMemo(() => {
    if (selectedPlan) {
      return addMonths(startDate, selectedPlan.duration);
    }
    return '';
  }, [selectedPlan, startDate]);

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

      <Form id="subscriptionForm" schema={schema} onSubmit={handleSubmit}>
        <AsyncSelect
          id="student_id"
          name="student_id"
          placeholder="Selecione o aluno"
          loadOptions={loadStudents}
          label="ALUNO"
          value={selectedStudent}
          onChange={setSelectedStudent}
        />
        <table>
          <tbody>
            <tr>
              <td>
                <Select
                  placeholder="Selecione o plano"
                  name="plan_id"
                  options={plans}
                  label="PLANO"
                  onChange={setSelectedPlan}
                  value={selectedPlan}
                />
              </td>
              <td>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  name="start_date"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  locale="pt"
                  label="DATA DE INÍCIO"
                />
              </td>
              <td>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  name="end_date"
                  selected={endDate}
                  disabled
                  locale="pt"
                  className="disableInput"
                  label="DATA DE TÉRMINO"
                />
              </td>
              <td>
                <Input
                  name="totalPriceFormatted"
                  label="VALOR FINAL"
                  disabled
                  className="disableInput"
                  value={totalPriceFormatted}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </Container>
  );
}
