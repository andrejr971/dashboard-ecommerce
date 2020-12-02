/* eslint-disable import/no-duplicates */
import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { ICategory } from '..';
import { useAuth } from '../../../hooks/auth';

import { Container } from './styles';

interface LineTableProps {
  category: ICategory;
  handleSelectedDelete(id: number): Promise<void>;
  handleSelectedUpate(id: number): Promise<void>;
}

const LineTable: React.FC<LineTableProps> = ({
  category,
  handleSelectedDelete,
  handleSelectedUpate,
}) => {
  const { user } = useAuth();

  return (
    <Container>
      <td>
        <span>ID</span>
        {category.id}
      </td>
      <td>
        <span>NOME</span>
        {category.name}
      </td>
      <td>
        <span>DESCRIÇÃO</span>
        {category.description}
      </td>
      <td>
        <span>CRIADO EM</span>
        {format(new Date(category.created_at), "dd 'de' MMM 'de' yyyy", {
          locale: pt,
        })}
      </td>

      {user.permission === '1' && (
        <td>
          <button
            type="button"
            onClick={() => handleSelectedUpate(category.id)}
          >
            <FiEdit />
          </button>
          <button
            type="button"
            onClick={() => handleSelectedDelete(category.id)}
          >
            <FiTrash />
          </button>
        </td>
      )}
    </Container>
  );
};

export default LineTable;
