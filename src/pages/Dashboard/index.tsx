import React from 'react';
import { FiBookmark, FiPackage, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <main>
        <nav>
          <Link to="/users">
            <FiUsers />
            Usuários
          </Link>
          <Link to="/categories">
            <FiPackage />
            Categorias
          </Link>
          <Link to="/brands">
            <FiBookmark />
            Marcas
          </Link>
          <Link to="/products">
            <FiPackage />
            Produtos
          </Link>
        </nav>
      </main>
    </Container>
  );
};

export default Dashboard;
