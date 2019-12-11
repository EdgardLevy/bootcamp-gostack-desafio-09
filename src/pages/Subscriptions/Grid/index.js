import React, {useState, useEffect} from 'react';
import {MdAdd, MdEdit, MdDelete, MdCheckCircle} from 'react-icons/md';
import swal from 'sweetalert';
import {toast} from 'react-toastify';
import {format, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';
import history from '~/services/history';
import {Container} from '../styles';
import {PrimaryButton, PaginateButton, ActionButton} from '~/components/Button';
import api from '~/services/api';

let tmrDebounceEvent = null;
const LIMIT_RECORDS_PER_PAGE = 5;
const path = 'subscriptions';

export default function Grid() {
  const [data, setData] = useState({
    records: [],
    meta: {has_prev: false, has_next: false, total_pages: 0, total_records: 0},
  });
  const [page, setPage] = useState(1);

  function debounce(event, param, ms) {
    console.tron.log('debounce');
    if (tmrDebounceEvent) clearTimeout(tmrDebounceEvent);
    tmrDebounceEvent = setTimeout(() => {
      console.tron.log('debounce timeout');
      event(param);
    }, ms);
  }

  useEffect(() => {
    async function loadRecords() {
      const response = await api.get(path, {
        params: {page, limit: LIMIT_RECORDS_PER_PAGE},
      });
      response.data.records.map(item => {
        item.startDateFormatted = format(
          parseISO(item.start_date),
          "d 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        );
        item.endDateFormatted = format(
          parseISO(item.end_date),
          "d 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        );
      });
      setData(response.data);
    }

    debounce(loadRecords, null, 300);
  }, [page]);

  function confirmDelete(id) {
    const _subscription = data.records.find(
      subscription => subscription.id === id
    );
    swal({
      text: `Deseja excluir a matrícula do aluno ${_subscription.student.name} ?`,
      icon: 'warning',
      dangerMode: true,
      buttons: ['Não', 'Sim'],
    }).then(async willDelete => {
      if (willDelete) {
        try {
          await api.delete(`${path}/${_subscription.id}`);

          const _data = {...data};
          _data.records.splice(
            data.records.findIndex(item => item.id === _subscription.id),
            1
          );
          setData(_data);

          toast.success('Matrícula excluída com sucesso');
        } catch (error) {
          toast.error('Falha na exclusão, entre em contato com o suporte');
        }
      }
    });
  }

  function renderPages() {
    if (data.meta.total_pages === 1) return;
    const pages = [];
    for (let idxpage = 1; idxpage <= data.meta.total_pages; idxpage++) {
      const b = (
        <PaginateButton
          key={idxpage}
          selected={idxpage === page}
          onClick={() => {
            setPage(idxpage);
          }}>
          {idxpage}
        </PaginateButton>
      );
      pages.push(b);
    }
    return pages;
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando matrículas</strong>
        <div>
          <aside>
            <PrimaryButton
              type="button"
              onClick={() => {
                history.push(`/${path}/create`);
              }}>
              <MdAdd color="#fff" size={20} />
              <span>CADASTRAR</span>
            </PrimaryButton>
          </aside>
        </div>
      </header>
      <div className="totalRecords">
        <span>{`Total de registros: ${data.meta.total_records}`}</span>
      </div>
      <table className="grid">
        <thead>
          <tr>
            <th>ALUNO</th>
            <th className="center">PLANO</th>
            <th className="center">INÍCIO</th>
            <th className="center">TÉRMINO</th>
            <th className="center">ATIVA</th>
            <th width="80" />
            <th width="80" />
          </tr>
        </thead>
        <tbody>
          {data.records.map(subscription => {
            return (
              <tr key={subscription.id}>
                <td>{subscription.student.name}</td>
                <td className="center">{subscription.plan.title}</td>
                <td className="center">{subscription.startDateFormatted}</td>
                <td className="center">{subscription.endDateFormatted}</td>
                <td className="center">
                  <MdCheckCircle
                    color={subscription.active ? '#42cb59' : '#dddddd'}
                  />
                </td>
                <td className="center">
                  <ActionButton
                    type="button"
                    title="editar"
                    onClick={() => {
                      history.push(`${path}/${subscription.id}`);
                    }}>
                    <MdEdit size={20} color="#fb6f91" />
                  </ActionButton>
                </td>

                <td className="center delete">
                  <ActionButton
                    type="button"
                    title="deletar"
                    onClick={() => {
                      confirmDelete(subscription.id);
                    }}>
                    <MdDelete size={20} color="#fb6f91" />
                  </ActionButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <div>
          <div>{renderPages()}</div>
        </div>
      </div>
    </Container>
  );
}
