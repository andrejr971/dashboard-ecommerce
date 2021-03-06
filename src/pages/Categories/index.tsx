import React from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import LineTable from './LineTable';

import { ContentRight, SearchInput, Table, Thead } from '../Users/styles';
import { Container } from './styles';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import { useCategory } from '../../hooks/categories';

export interface ICategory {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface IRequest {
  name: string;
  description: string;
}

const Categories: React.FC = () => {
  const { user } = useAuth();
  const {
    categories,
    isVisibleModalDelete,
    selectedCatgory,
    isVisibleModalEdit,
    isVisibleModalNew,
    handleModalVisibleAdd,
    handleDelete,
    handleAdd,
    handleModalVisibleDelete,
    handleModalVisibleEdit,
    handleSelectedDelete,
    handleSelectedUpate,
    handleUpdate,
  } = useCategory();

  return (
    <Container>
      <header>
        <h1>Categorias</h1>

        <ContentRight>
          <SearchInput>
            <FiSearch />
            <input type="text" placeholder="Pesquisar" />
          </SearchInput>
          {user.permission === '1' && (
            <button type="button" onClick={handleModalVisibleAdd}>
              <span>Nova</span>
              <FiPlus />
            </button>
          )}
        </ContentRight>
      </header>

      <main>
        <Table>
          <Thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>DESCRIÇÃO</th>
              <th>CRIADO EM</th>
              <th>OPÇÕES</th>
            </tr>
          </Thead>
          <tbody>
            {categories.map(category => (
              <LineTable
                key={category.id}
                category={category}
                handleSelectedDelete={handleSelectedDelete}
                handleSelectedUpate={handleSelectedUpate}
              />
            ))}
          </tbody>
        </Table>
      </main>

      <ModalAdd
        handleAdd={handleAdd}
        isOpen={isVisibleModalNew}
        setIsOpen={handleModalVisibleAdd}
      />

      <ModalEdit
        handleAdd={handleUpdate}
        isOpen={isVisibleModalEdit}
        setIsOpen={handleModalVisibleEdit}
        category={selectedCatgory}
      />

      <ModalDelete
        handleDelete={handleDelete}
        isOpen={isVisibleModalDelete}
        setIsOpen={handleModalVisibleDelete}
        category={selectedCatgory}
      />
    </Container>
  );
};

export default Categories;
