import React, { useCallback, useEffect, useState, useRef } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Modal from '../../components/Modal';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import LineTable from './LineTable';

import Input from '../../components/Input';
import Button from '../../components/Button';
import InputPassword from '../../components/InputPassword';
import RadioBox from '../../components/RadioBox';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationsErrors';

import {
  Container,
  SearchInput,
  ContentRight,
  Table,
  Thead,
  GroupForm,
} from './styles';

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

interface IRequest {
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
  const [clean, setClean] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { addToast } = useToast();

  const formAdd = useRef<FormHandles>(null);

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

  const handleSubmitAddUser = useCallback(
    async (data: IRequest) => {
      try {
        setIsLoading(true);
        formAdd.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required('Username obrigatório'),
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().email().required('E-mail obrigatório'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'No mínimo 6 dígitos'),
          password_confirmation: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

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

        formAdd.current?.reset();
        setClean(true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formAdd.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Ocorreu um erro ao logar',
          description:
            'Pro favor, verifique as suas credenciais e tente novamente',
        });
      } finally {
        setIsLoading(false);
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

      <Modal
        title="Novo Usuário"
        setVisible={setIsVisibleModalNew}
        visible={isVisibleModalNew}
      >
        <Form onSubmit={handleSubmitAddUser} ref={formAdd}>
          <GroupForm>
            <Input name="name" placeholder="Nome" />
            <Input name="username" placeholder="Username" />
          </GroupForm>

          <Input type="email" name="email" placeholder="E-mail" />

          <RadioBox name="permission" setClean={setClean} clean={clean} />

          <GroupForm>
            <InputPassword name="password" placeholder="Senha" />
            <InputPassword
              name="password_confirmation"
              placeholder="Confirme a senha"
            />
          </GroupForm>

          {isLoading ? (
            'Carregando...'
          ) : (
            <GroupForm>
              <Button type="submit">Salvar</Button>
              <Button
                type="button"
                backgroundColor="#c53030"
                onClick={() => setIsVisibleModalNew(false)}
              >
                Cancelar
              </Button>
            </GroupForm>
          )}
        </Form>
      </Modal>

      <Modal
        title={`Deseja deletar ${selectedModerator.name}??`}
        setVisible={setIsVisibleModalDelete}
        visible={isVisibleModalDelete}
      >
        <GroupForm>
          <Button type="button" onClick={handleDelete}>
            Confirmar
          </Button>
          <Button
            type="button"
            backgroundColor="#c53030"
            onClick={() => setIsVisibleModalDelete(false)}
          >
            Cancelar
          </Button>
        </GroupForm>
      </Modal>
    </Container>
  );
};

export default Users;
