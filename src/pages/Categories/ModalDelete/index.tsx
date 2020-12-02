import React from 'react';
import { FiX } from 'react-icons/fi';
import Modal from '../../../components/Modal';

import { ICategory } from '..';
import Button from '../../../components/Button';

import { ButtonClose, Content, GroupForm } from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleDelete: (id: number) => void;
  category: ICategory;
}

const ModalDelete: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleDelete,
  category,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Content>
        <h2>Deseja deletar?</h2>
        <ButtonClose type="button" onClick={setIsOpen}>
          <FiX />
        </ButtonClose>
      </Content>
      <GroupForm>
        <Button type="button" onClick={() => handleDelete(category.id)}>
          Confirmar
        </Button>
        <Button type="button" backgroundColor="#c53030" onClick={setIsOpen}>
          Cancelar
        </Button>
      </GroupForm>
    </Modal>
  );
};

export default ModalDelete;
