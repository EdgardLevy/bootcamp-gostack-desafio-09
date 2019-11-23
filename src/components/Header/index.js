import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import logo from '~/assets/logo.png';

import {Container, Content, Profile} from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <Link to="/dashboard">DASHBOARD</Link>
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
