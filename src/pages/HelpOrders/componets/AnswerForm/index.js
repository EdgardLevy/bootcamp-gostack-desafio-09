import React from 'react';
import Popup from 'reactjs-popup';
import {Form} from '@rocketseat/unform';
import {Container} from './styles';
import {PrimaryButton} from '~/components/Button';

export default function AnswerForm({helpOrder, onClose}) {
  return (
    <Popup open={helpOrder} modal onClose={onClose}>
      {helpOrder && (
        <Container>
          <label htmlFor="question">PERGUNTA DO ALUNO</label>
          <span name="question">{helpOrder.question}</span>
          <label htmlFor="form">SUA RESPOSTA</label>
          <Form id="answerForm">
            <textarea />
            <PrimaryButton type="submit">
              <span>Responder aluno</span>
            </PrimaryButton>
          </Form>
        </Container>
      )}
    </Popup>
  );
}
