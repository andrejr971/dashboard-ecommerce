import React, { useCallback, useEffect, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import LineTable from './LineTable';
import ModalAdd from './ModalAdd';

import { Container, ContentRight, SearchInput, Table, Thead } from './styles';

export interface IProducts {
  id: number;
  category_id: number;
  brand_id: number;
  name: string;
  discount?: number;
  category_name: string;
  brand_name: string;
  created_at: Date;
}

export interface IRequest {
  name: string;
  category: number;
  brand: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const { addToast } = useToast();

  const loadData = useCallback(async () => {
    const response = await api.get('products');

    setProducts(response.data);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleVisible = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: IRequest) => {
      try {
        const response = await api.post('products', data);

        addToast({
          type: 'success',
          title: 'Sucesso ao cadastrar',
        });

        handleVisible();
        history.push(`/products/${response.data.id}/variations`);
      } catch {
        addToast({
          type: 'error',
          title: 'Falha ao cadastrar',
        });
      }
    },
    [history, addToast, handleVisible],
  );

  return (
    <Container>
      <header>
        <h1>Produtos</h1>

        <ContentRight>
          <SearchInput>
            <FiSearch />
            <input type="text" placeholder="Pesquisar" />
          </SearchInput>
          <button type="button" onClick={handleVisible}>
            <span>Novo</span>
            <FiPlus />
          </button>
        </ContentRight>
      </header>

      <main>
        <Table>
          <Thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>CATEGORIA</th>
              <th>MARCA</th>
              <th>OPÇÕES</th>
            </tr>
          </Thead>
          <tbody>
            {products.map(product => (
              <LineTable key={product.id} product={product} />
            ))}
          </tbody>
        </Table>
      </main>

      <ModalAdd
        isOpen={isVisible}
        setIsOpen={handleVisible}
        handleAdd={handleSubmit}
      />
    </Container>
  );
};

export default Products;
