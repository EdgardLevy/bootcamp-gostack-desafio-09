import React, {useState, useEffect} from 'react';
import {MdAdd} from 'react-icons/md';
import {Link} from 'react-router-dom';
import history from '~/services/history';
import {Container} from '../styles';
import {PrimaryButton} from '~/components/Button';
import api from '~/services/api';

export default function Grid() {
  const [students, setStudents] = useState([]);

  async function loadStudents(searchText = '') {
    const response = await api.get('students', {params: {q: searchText}});
    const {data} = response;
    setStudents(data);
  }
  useEffect(() => {
    loadStudents();
  }, []);

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
            <input type="text" id="search" placeholder="Buscar aluno" />
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
          {students.map(student => {
            return (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td className="center">20</td>
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
