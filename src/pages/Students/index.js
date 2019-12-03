import React, {useState, useEffect} from 'react';
import {MdAdd, MdKeyboardArrowLeft} from 'react-icons/md';
import {Container} from './styles';
import {PrimaryButton, SecondaryBytton} from '~/components/Button';

import api from '~/services/api';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');
      const {data} = response;
      console.tron.log(data);
      setStudents(data);
    }
    loadStudents();
  }, []);

  return (
    <Container>
      <header>
        <strong>Gerenciando Alunos</strong>
        <div>
          <SecondaryBytton type="button">
            <MdKeyboardArrowLeft color="#fff" size={20} />
            <span>VOLTAR</span>
          </SecondaryBytton>

          <PrimaryButton type="button" primary>
            <MdAdd color="#fff" size={20} />
            <span>CADASTRAR</span>
          </PrimaryButton>
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
              <tr>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td className="center">20</td>
                <td className="center edit">editar</td>
                <td className="center delete">apagar</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}
