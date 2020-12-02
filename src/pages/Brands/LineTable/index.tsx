/* eslint-disable import/no-duplicates */
import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { IBrand } from '..';
import { useAuth } from '../../../hooks/auth';

import { Container } from './styles';

interface LineTableProps {
  brand: IBrand;
  handleSelectedDelete(id: number): Promise<void>;
  handleSelectedUpate(id: number): Promise<void>;
}

const LineTable: React.FC<LineTableProps> = ({
  brand,
  handleSelectedDelete,
  handleSelectedUpate,
}) => {
  const { user } = useAuth();

  return (
    <Container>
      <td>
        <span>ID</span>
        {brand.id}
      </td>
      <td>
        <span>NOME</span>
        {brand.name}
      </td>
      <td>
        <span>DESCRIÇÃO</span>
        {brand.description}
      </td>
      <td>
        <span>CRIADO EM</span>
        {format(new Date(brand.created_at), "dd 'de' MMM 'de' yyyy", {
          locale: pt,
        })}
      </td>

      {user.permission === '1' && (
        <td>
          <button type="button" onClick={() => handleSelectedUpate(brand.id)}>
            <FiEdit />
          </button>
          <button type="button" onClick={() => handleSelectedDelete(brand.id)}>
            <FiTrash />
          </button>
        </td>
      )}
    </Container>
  );
};

export default LineTable;
