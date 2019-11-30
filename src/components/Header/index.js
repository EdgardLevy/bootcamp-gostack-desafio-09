import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import logo from '~/assets/logo_header.png';

import {Container, Content, Profile} from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <span>GYMPOINT</span>
          <Link to="/dashboard">ALUNOS</Link>
          <Link to="/dashboard1">PLANOS</Link>
          <Link to="/dashboard1">MATRÍCULAS</Link>
          <Link to="/dashboard1">PEDIDOS DE AUXÍLIO</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
