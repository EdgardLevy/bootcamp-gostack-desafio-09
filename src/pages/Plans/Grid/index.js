import React, {useState, useEffect} from 'react';
import {MdAdd, MdEdit, MdDelete} from 'react-icons/md';
import swal from 'sweetalert';
import {toast} from 'react-toastify';
import history from '~/services/history';
import {Container} from '../styles';
import {PrimaryButton, PaginateButton, ActionButton} from '~/components/Button';
import api from '~/services/api';
import {formatPrice} from '~/util/format';

let tmrDebounceEvent = null;
const LIMIT_RECORDS_PER_PAGE = 5;

export default function Grid() {
  const [searchText, setSearchText] = useState('');
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
      const response = await api.get('plans', {
        params: {q: searchText, page, limit: LIMIT_RECORDS_PER_PAGE},
      });

      /**
       *
       * priceFormatted: formatPrice(product.price),
       *
       */

      console.tron.log(response);

      response.data.records.map(item => {
        item.durationFormatted =
          item.duration === 1
            ? `${item.duration} mês`
            : `${item.duration} meses`;
        item.priceFormatted = formatPrice(item.price);
      });

      setData(response.data);
    }

    debounce(loadRecords, null, 300);
  }, [page, searchText]);

  function confirmDelete(id) {
    console.tron.log(id);
    const _plan = data.records.find(plan => plan.id === id);
    swal({
      text: `Deseja excluir o plano ${_plan.title} ?`,
      icon: 'warning',
      dangerMode: true,
      buttons: ['Não', 'Sim'],
    }).then(async willDelete => {
      if (willDelete) {
        // swal('Poof! Your imaginary file has been deleted!', {
        //   icon: 'success',
        // });
        try {
          await api.delete(`plans/${_plan.id}`);
          const response = await api.get('plans', {
            params: {q: searchText, page, limit: LIMIT_RECORDS_PER_PAGE},
          });

          setData(response.data);

          toast.success('Plano excluído com sucesso');
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
        <strong>Gerenciando planos</strong>
        <div>
          <aside>
            <PrimaryButton
              type="button"
              onClick={() => {
                history.push('/plans/create');
              }}>
              <MdAdd color="#fff" size={20} />
              <span>CADASTRAR</span>
            </PrimaryButton>
            <input
              type="text"
              id="search"
              placeholder="Buscar plano"
              onChange={e => {
                setPage(1);
                setSearchText(e.target.value);
              }}
            />
          </aside>
        </div>
      </header>
      <div className="totalRecords">
        <span>{`Total de registros: ${data.meta.total_records}`}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th width="390">TÍTULO</th>
            <th width="390">DURAÇÃO</th>
            <th width="150" className="center">
              VALOR p/ MÊS
            </th>
            <th width="80" />
            <th width="80" />
          </tr>
        </thead>
        <tbody>
          {data.records.map(plan => {
            return (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.durationFormatted}</td>
                <td className="center">{plan.priceFormatted}</td>
                <td className="center">
                  <ActionButton
                    type="button"
                    title="editar"
                    onClick={() => {
                      history.push(`plans/${plan.id}`);
                    }}>
                    <MdEdit size={20} color="#fb6f91" />
                  </ActionButton>
                </td>

                <td className="center delete">
                  <ActionButton
                    type="button"
                    title="deletar"
                    onClick={() => {
                      confirmDelete(plan.id);
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
