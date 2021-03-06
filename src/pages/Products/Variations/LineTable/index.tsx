import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { IVariations } from '..';
import { useAuth } from '../../../../hooks/auth';
import { Container } from './styles';

interface LineTableProps {
  variation: IVariations;
  handleDelete(id: number): void;
}

const LineTable: React.FC<LineTableProps> = ({ variation, handleDelete }) => {
  const { user } = useAuth();

  return (
    <Container>
      <td>
        <span>ID</span>
        {variation.id}
      </td>
      <td>
        <span>NOME</span>
        {variation.name}
      </td>
      <td>
        <div>
          <Link to={`/products/${variation.id}/variations/${variation.slug}`}>
            <FiEdit />
          </Link>
          {user.permission === '1' && (
            <button type="button" onClick={() => handleDelete(variation.id)}>
              <FiTrash />
            </button>
          )}
        </div>
      </td>
    </Container>
  );
};

export default LineTable;
