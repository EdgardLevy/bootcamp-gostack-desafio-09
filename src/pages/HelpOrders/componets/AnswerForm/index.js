import React from 'react';
import Popup from 'reactjs-popup';
// import { Container } from './styles';

export default function AnswerForm({helpOrder, onClose}) {
  return (
    <Popup open={helpOrder} modal onClose={onClose}>
      <h1>teste</h1>
    </Popup>
  );
}
