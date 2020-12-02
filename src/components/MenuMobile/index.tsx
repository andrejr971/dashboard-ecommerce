import React, { useCallback, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Container, ButtonMenu, Nav, Content } from './styles';

const MenuMobile: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const HandleRoute = (active: boolean, to: string) => {
    const match = useRouteMatch({
      path: to,
      exact: active,
    });

    return match ? 'active' : '';
  };

  const handleVisible = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const history = useHistory();

  const handlePage = useCallback(
    (route: string) => {
      setIsVisible(false);
      history.push(route);
    },
    [history],
  );

  return (
    <Container>
      <ButtonMenu type="button" onClick={handleVisible}>
        <FiMenu />
      </ButtonMenu>

      <Nav isVisible={isVisible}>
        <Content>
          <header>
            <button type="button" onClick={handleVisible}>
              <FiX />
            </button>
          </header>

          <button
            type="button"
            className={HandleRoute(true, '/')}
            onClick={() => handlePage('/')}
          >
            Home
          </button>
          <button
            type="button"
            className={HandleRoute(false, '/users')}
            onClick={() => handlePage('/users')}
          >
            Usuários
          </button>
          <button
            type="button"
            className={HandleRoute(false, '/categories')}
            onClick={() => handlePage('/categories')}
          >
            Categorias
          </button>
          <button
            type="button"
            className={HandleRoute(false, '/brands')}
            onClick={() => handlePage('/brands')}
          >
            Marcas
          </button>
          <button
            type="button"
            className={HandleRoute(false, '/products')}
            onClick={() => handlePage('/products')}
          >
            Produtos
          </button>
          <button type="button">Sair</button>
        </Content>
      </Nav>
    </Container>
  );
};

export default MenuMobile;
