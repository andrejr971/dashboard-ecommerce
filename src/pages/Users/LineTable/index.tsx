import React from 'react';
import { FiTrash } from 'react-icons/fi';

import { IModerators } from '..';
import { useAuth } from '../../../hooks/auth';
import { Container } from './styles';

interface LineTableProps {
  moderator: IModerators;
  handleSelectedUserDelete(id: number): void;
}

const LineTable: React.FC<LineTableProps> = ({
  moderator,
  handleSelectedUserDelete,
}) => {
  const { user } = useAuth();

  return (
    <Container>
      <td>
        <img
          src={
            moderator.avatar_url
              ? moderator.avatar_url
              : `https://ui-avatars.com/api/?name=${moderator.name}&background=ffbf5a&color=1b1b1b&bold=true&format=svg&size=110`
          }
          alt={moderator.name}
        />
      </td>
      <td>
        <span>ID</span>
        {moderator.id}
      </td>
      <td>
        <span>NOME</span>
        {moderator.name}
      </td>
      <td>
        <span>Permissão</span>
        {moderator.permission === '0' ? 'Usuário' : 'Administrador'}
      </td>
      {user.permission === '1' && (
        <td>
          <button
            type="button"
            onClick={() => handleSelectedUserDelete(moderator.id)}
          >
            <FiTrash />
          </button>
        </td>
      )}
    </Container>
  );
};

export default LineTable;
