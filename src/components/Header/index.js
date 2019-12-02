import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {signOut} from '~/store/modules/auth/actions';

import logo from '~/assets/logo_header.png';

import {Container, Content, Profile} from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <span>GYMPOINT</span>
          <Link to="/dashboard">DASHBOARD</Link>
          <Link to="/students">ALUNOS</Link>
          <Link to="/plans">PLANOS</Link>
          <Link to="/subscriptions">MATRÍCULAS</Link>
          <Link to="/helporders">PEDIDOS DE AUXÍLIO</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleLogout}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
