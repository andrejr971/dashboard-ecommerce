import React, { useCallback, useEffect, useState } from 'react';

import { FiPlus, FiSearch } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import LineTable from './LineTable';

import { useToast } from '../../hooks/toast';

import { Container, SearchInput, ContentRight, Table, Thead } from './styles';
import ModalAdd from './ModalAdd';
import ModalDelete from './ModalDelete';

export interface IModerators {
  id: number;
  username: string;
  name: string;
  email: string;
  permission: '0' | '1';
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IRequest {
  username: string;
  name: string;
  email: string;
  permission: ['0' | '1'];
  password: string;
  password_confirmation: string;
}

const Users: React.FC = () => {
  const [moderators, setModerators] = useState<IModerators[]>([]);
  const [selectedModerator, setSelectedModerator] = useState<IModerators>(
    {} as IModerators,
  );
  const [isVisibleModalNew, setIsVisibleModalNew] = useState(false);
  const [isVisibleModalDelete, setIsVisibleModalDelete] = useState(false);

  const { user } = useAuth();
  const { addToast } = useToast();

  const loadingData = useCallback(async () => {
    const { data } = await api.get('users');
    const filterUsers = data.filter(
      (dataUser: IModerators) => dataUser.id !== user.id,
    );

    setModerators(filterUsers);
  }, [user.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  const handleVisibleModalNew = useCallback(() => {
    setIsVisibleModalNew(!isVisibleModalNew);
  }, [isVisibleModalNew]);

  const handleVisibleModalDelete = useCallback(() => {
    setIsVisibleModalDelete(!isVisibleModalDelete);
  }, [isVisibleModalDelete]);

  const handleSubmitAddUser = useCallback(
    async (data: IRequest) => {
      try {
        const response = await api.post('users', {
          name: data.name,
          username: data.username,
          email: data.email,
          permission: data.permission[0],
          password: data.password,
          password_confirmation: data.password_confirmation,
        });

        const dataUsers: IModerators[] = moderators;

        dataUsers.push(response.data);

        setModerators(dataUsers);
        setIsVisibleModalNew(false);

        addToast({
          type: 'success',
          title: 'Sucesso ao cadastrar',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Ocorreu um erro ao cadastrar',
        });
      }
    },
    [addToast, moderators],
  );

  const handleSelectedUserDelete = useCallback(
    (id: number) => {
      const findModerator = moderators.find(moderator => moderator.id === id);

      if (!findModerator) return;

      setSelectedModerator(findModerator);
      setIsVisibleModalDelete(true);
    },
    [moderators],
  );

  const handleDelete = useCallback(async () => {
    await api.delete(`users/${selectedModerator.id}`);

    const dataModerators = moderators.filter(
      moderator => moderator.id !== selectedModerator.id,
    );

    setModerators(dataModerators);
    setIsVisibleModalDelete(false);

    addToast({
      type: 'success',
      title: 'Sucesso ao deletar',
    });
  }, [selectedModerator, moderators, addToast]);

  return (
    <Container>
      <header>
        <h1>Usuários</h1>

        <ContentRight>
          <SearchInput>
            <FiSearch />
            <input type="text" placeholder="Pesquisar" />
          </SearchInput>
          {user.permission === '1' && (
            <button type="button" onClick={() => setIsVisibleModalNew(true)}>
              <span>Novo</span>
              <FiPlus />
            </button>
          )}
        </ContentRight>
      </header>

      <main>
        <Table>
          <Thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>NOME</th>
              <th>PERMISSÃO</th>
              {user.permission === '1' && <th>OPÇÕES</th>}
            </tr>
          </Thead>
          <tbody>
            {moderators.map(moderator => (
              <LineTable
                key={moderator.id}
                moderator={moderator}
                handleSelectedUserDelete={handleSelectedUserDelete}
              />
            ))}
          </tbody>
        </Table>
      </main>

      <ModalAdd
        isOpen={isVisibleModalNew}
        setIsOpen={handleVisibleModalNew}
        handleAdd={handleSubmitAddUser}
      />

      <ModalDelete
        setIsOpen={handleVisibleModalDelete}
        handleDelete={handleDelete}
        isOpen={isVisibleModalDelete}
        moderator={selectedModerator}
      />
    </Container>
  );
};

export default Users;
