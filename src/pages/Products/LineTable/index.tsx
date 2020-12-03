import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { IProducts } from '..';
import { useAuth } from '../../../hooks/auth';
import { Container } from './styles';

interface LineTableProps {
  product: IProducts;
  handleDelete(id: number): void;
}

const LineTable: React.FC<LineTableProps> = ({ product, handleDelete }) => {
  const { user } = useAuth();

  return (
    <Container>
      <td>
        <span>ID</span>
        {product.id}
      </td>
      <td>
        <span>NOME</span>
        {product.name}
      </td>
      <td>
        <span>CATEGORIA</span>
        {product.category_name}
      </td>
      <td>
        <span>MARCA</span>
        {product.brand_name}
      </td>
      <td>
        <div>
          <Link to={`/products/${product.id}/variations`}>
            <FiEdit />
          </Link>
          {user.permission === '1' && (
            <button type="button" onClick={() => handleDelete(product.id)}>
              <FiTrash />
            </button>
          )}
        </div>
      </td>
    </Container>
  );
};

export default LineTable;
