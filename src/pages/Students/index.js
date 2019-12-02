import React from 'react';
import {MdAdd} from 'react-icons/md';
import {Container} from './styles';

export default function Students() {
  return (
    <Container>
      <header>
        <strong>Alunos</strong>

        <button type="button">
          <MdAdd color="#fff" size={20} /> CADASTRAR
        </button>
      </header>
    </Container>
  );
}
