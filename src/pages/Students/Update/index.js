import React from 'react';

import {Container} from '../styles';

export default function Update({match}) {
  console.tron.log(match);
  const {id} = match.params;
  return (
    <Container>
      <h1>Update {`${id}`}</h1>
    </Container>
  );
}
