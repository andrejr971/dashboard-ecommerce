import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.png';
import favicoImg from '../../assets/favicon.png';

import {
  Container,
  Content,
  Logo,
  Profile,
  ButtonLogout,
  Right,
  Nav,
} from './styles';
import MenuMobile from '../MenuMobile';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  const HandleRoute = (active: boolean, to: string) => {
    const match = useRouteMatch({
      path: to,
      exact: active,
    });

    return match ? 'active' : '';
  };

  return (
    <Container>
      <Content>
        <Logo to="/">
          <img src={logoImg} alt="Logo Dreshoes" />

          <div>
            <img src={favicoImg} alt="Logo Dreshoes" />
          </div>
        </Logo>

        <Nav>
          <ul>
            <li>
              <Link to="/" className={HandleRoute(true, '/')}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/users" className={HandleRoute(false, '/users')}>
                Usuários
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className={HandleRoute(false, '/categories')}
              >
                Categorias
              </Link>
            </li>
            <li>
              <Link to="/products" className={HandleRoute(false, '/products')}>
                Produtos
              </Link>
            </li>
          </ul>
        </Nav>

        <Right>
          <Profile to="/profile">
            <img src={user.avatar_url} alt={user.name} />

            <strong>{user.name}</strong>
          </Profile>

          <ButtonLogout type="button" onClick={signOut}>
            <span>Sair</span>
            <FiLogOut />
          </ButtonLogout>

          <MenuMobile />
        </Right>
      </Content>
    </Container>
  );
};

export default Header;
