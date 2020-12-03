import { Form } from '@unform/web';
import React, { useCallback, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';
import LineTable from './LineTable';

import { Container, ContentRight, Table, Thead } from './styles';

interface IParams {
  id: string;
}

export interface IVariations {
  id: number;
  name: string;
  slug: string;
  price: number;
}

interface IProductProps {
  id: number;
  name: string;
  discount?: number;
  category: {
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
  variations: IVariations[];
}

interface IRequest {
  name: string;
  category: number;
  discount?: number;
  brand: number;
}

const Variations: React.FC = () => {
  const [product, setProduct] = useState<IProductProps>({} as IProductProps);
  const [initialData, setInitialData] = useState<IRequest>({} as IRequest);
  const { id } = useParams<IParams>();
  const { addToast } = useToast();

  const loadData = useCallback(async () => {
    const response = await api.get(`products/${id}`);

    setProduct(response.data);

    setInitialData({
      name: response.data.name,
      discount: response.data.discount,
      category: response.data.category.id,
      brand: response.data.brand.id,
    });
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = useCallback(
    async (data: Omit<IRequest, 'category' | 'brand'>) => {
      await api.put(`products/${id}`, data);

      addToast({
        type: 'success',
        title: 'Atualizado com sucesso',
      });
    },
    [id, addToast],
  );

  const handleDelete = useCallback(
    async (variation_id: number) => {
      await api.delete(`product-variations/${variation_id}`);

      const filterProducts = {
        ...product,
        variations: product.variations.filter(
          variation => variation.id !== variation_id,
        ),
      };

      setProduct(filterProducts);

      addToast({
        type: 'success',
        title: 'Sucesso ao deletar',
      });
    },
    [product, addToast],
  );

  return (
    <Container>
      <header>
        <h1>{product.name}</h1>

        <ContentRight>
          <Link to={`/products/${id}/variations/create`}>
            <span>Novo</span>
            <FiPlus />
          </Link>
        </ContentRight>
      </header>

      <main>
        <Form onSubmit={handleSubmit} initialData={initialData}>
          <Input name="name" placeholder="Nome" />
          <Input name="discount" placeholder="Desconto" />

          <Button type="submit">Salvar</Button>
        </Form>

        <Table>
          <Thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>OPÇÕES</th>
            </tr>
          </Thead>

          <tbody>
            {product.variations &&
              product.variations.map(variation => (
                <LineTable
                  key={variation.id}
                  variation={variation}
                  handleDelete={handleDelete}
                />
              ))}
          </tbody>
        </Table>
      </main>
    </Container>
  );
};

export default Variations;
