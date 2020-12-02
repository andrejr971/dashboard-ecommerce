import React from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

import { Container, ContentRight, SearchInput } from './styles';

const Products: React.FC = () => {
  return (
    <Container>
      <header>
        <h1>Produtos</h1>

        <ContentRight>
          <SearchInput>
            <FiSearch />
            <input type="text" placeholder="Pesquisar" />
          </SearchInput>
          <button type="button" onClick={() => console.log(true)}>
            <span>Novo</span>
            <FiPlus />
          </button>
        </ContentRight>
      </header>
    </Container>
  );
};

export default Products;
