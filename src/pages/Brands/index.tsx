import React from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import LineTable from './LineTable';

import { ContentRight, SearchInput, Table, Thead } from '../Users/styles';
import { Container } from './styles';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import { useBrand } from '../../hooks/brand';

export interface IBrand {
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

const Brands: React.FC = () => {
  const { user } = useAuth();
  const {
    brands,
    isVisibleModalDelete,
    selectedBrand,
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
  } = useBrand();

  return (
    <Container>
      <header>
        <h1>Marcas</h1>

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
            {brands.map(brand => (
              <LineTable
                key={brand.id}
                brand={brand}
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
        brand={selectedBrand}
      />

      <ModalDelete
        handleDelete={handleDelete}
        isOpen={isVisibleModalDelete}
        setIsOpen={handleModalVisibleDelete}
        brand={selectedBrand}
      />
    </Container>
  );
};

export default Brands;
