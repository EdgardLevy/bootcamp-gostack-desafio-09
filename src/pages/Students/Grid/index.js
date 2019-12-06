import React, { useState, useEffect, useCallback } from 'react';
import { MdAdd, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import history from '~/services/history';
import { Container } from '../styles';
import { PrimaryButton, SecondaryButton } from '~/components/Button';
import api from '~/services/api';

let tmrDebounceEvent = null;

export default function Grid() {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState({ records: [] });
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(3);

  function debounce(event, param, ms) {
    console.tron.log('debounce');
    if (tmrDebounceEvent) clearTimeout(tmrDebounceEvent);
    tmrDebounceEvent = setTimeout(() => {
      console.tron.log('debounce timeout');
      event(param);
    }, ms);
  }

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', {
        params: { q: searchText, page, limit },
      });

      setData(response.data);
      setHasPrevPage(response.data.meta.has_prev);
      setHasNextPage(response.data.meta.has_next);
    }

    debounce(loadStudents, null, 500);
  }, [limit, page, searchText]);

  return (
    <Container>
      <header>
        <strong>Gerenciando Alunos</strong>
        <div>
          <aside>
            <PrimaryButton
              type="button"
              onClick={() => {
                history.push('/students/create');
              }}>
              <MdAdd color="#fff" size={20} />
              <span>CADASTRAR</span>
            </PrimaryButton>
            <input
              type="text"
              id="search"
              placeholder="Buscar aluno"
              onChange={e => {
                setPage(1);
                setSearchText(e.target.value);
              }}
            />
            <div className="pagination">
              <SecondaryButton
                disabled={!hasPrevPage}
                onClick={() => {
                  if (page - 1 < 1) return;
                  setPage(page - 1);
                }}>
                <MdKeyboardArrowLeft color="#fff" size={20} />
              </SecondaryButton>
              <span>{page}</span>
              <SecondaryButton
                disabled={!hasNextPage}
                onClick={() => {
                  if (page + 1 > data.meta.total_pages) return;
                  setPage(page + 1);
                }}>
                <MdKeyboardArrowRight color="#fff" size={20} />
              </SecondaryButton>
            </div>
          </aside>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th width="390">NOME</th>
            <th width="390">E-MAIL</th>
            <th width="150" className="center">
              IDADE
            </th>
            <th width="80" />
            <th width="80" />
          </tr>
        </thead>
        <tbody>
          {data.records.map(student => {
            return (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td className="center">{student.age}</td>
                <td className="center edit">
                  <Link to={`students/${student.id}`}>editar</Link>
                </td>
                <td className="center delete">apagar</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}
