import React, {useState, useEffect} from 'react';
import {MdAdd, MdKeyboardArrowLeft} from 'react-icons/md';
import history from '~/services/history';
import {Container} from '../styles';
import {PrimaryButton, SecondaryBytton} from '~/components/Button';
import api from '~/services/api';

export default function Grid() {
  return (
    <Container>
      <header>
        <strong>Cadastro de Aluno</strong>
        <div>
          <aside>
            <SecondaryBytton
              type="button"
              onClick={() => {
                history.push('/students');
              }}>
              <MdKeyboardArrowLeft color="#fff" size={20} />
              <span>VOLTAR</span>
            </SecondaryBytton>

            <PrimaryButton type="button">
              <MdAdd color="#fff" size={20} />
              <span>SALVAR</span>
            </PrimaryButton>
          </aside>
        </div>
      </header>
    </Container>
  );
}
