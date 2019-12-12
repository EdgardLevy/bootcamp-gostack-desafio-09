import React, {useState, useEffect, useMemo} from 'react';
import {MdReply} from 'react-icons/md';
import swal from 'sweetalert';
import {toast} from 'react-toastify';
import {format, parseISO, setISODay} from 'date-fns';
import pt from 'date-fns/locale/pt';
import history from '~/services/history';
import {Container} from '../styles';
import {PaginateButton, ActionButton} from '~/components/Button';
import api from '~/services/api';
import AnswerForm from '../componets/AnswerForm';

let tmrDebounceEvent = null;
const LIMIT_RECORDS_PER_PAGE = 10;
const path = 'help-orders';

export default function Grid() {
  const [data, setData] = useState({
    records: [],
    meta: {has_prev: false, has_next: false, total_pages: 0, total_records: 0},
  });
  const [page, setPage] = useState(1);
  const [helpOrderId, setHelpOrderId] = useState(1);

  const helpOrder = useMemo(() => {
    if (!helpOrderId) return;
    return data.records.find(item => item.id === helpOrderId);
  }, [data.records, helpOrderId]);

  function debounce(event, param, ms) {
    if (tmrDebounceEvent) clearTimeout(tmrDebounceEvent);
    tmrDebounceEvent = setTimeout(() => {
      event(param);
    }, ms);
  }

  useEffect(() => {
    async function loadRecords() {
      const response = await api.get(path, {
        params: {page, limit: LIMIT_RECORDS_PER_PAGE},
      });
      response.data.records.map(item => {
        item.createdAtFormatted = format(
          parseISO(item.created_at),
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
          await api.delete(`subscriptions/${_subscription.id}`);

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

  function closePopUp() {
    console.tron.log('closePopUp');
    setHelpOrderId(null);
  }

  return (
    <Container>
      <AnswerForm helpOrder={helpOrder} onClose={closePopUp} />
      <header>
        <strong>Pedidos de auxílio</strong>
      </header>
      <div className="totalRecords">
        <span>{`Total de registros: ${data.meta.total_records}`}</span>
      </div>
      <table className="grid">
        <thead>
          <tr>
            <th>ALUNO</th>
            <th width="80" />
          </tr>
        </thead>
        <tbody>
          {data.records.map(helpOrder => {
            return (
              <tr key={helpOrder.id}>
                <td>{helpOrder.student.name}</td>

                <td className="center">
                  <ActionButton
                    type="button"
                    title="responder"
                    onClick={() => {
                      // history.push(`subscriptions/${helpOrder.id}`);
                      setHelpOrderId(helpOrder.id);
                    }}>
                    <MdReply size={20} color="#fb6f91" />
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
