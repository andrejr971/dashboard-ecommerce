import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiX } from 'react-icons/fi';
import Modal from '../../../components/Modal';
import getValidationErrors from '../../../utils/getValidationsErrors';

import { ICategory, IRequest } from '..';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { ButtonClose, Content, GroupForm } from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAdd: (data: IRequest) => void;
  category: ICategory;
}

const ModalEdit: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAdd,
  category,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IRequest) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          description: Yup.string().required('Descrição obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        handleAdd(data);
        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleAdd, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} initialData={category} ref={formRef}>
        <Content>
          <h2>Editar categoria</h2>
          <ButtonClose type="button" onClick={setIsOpen}>
            <FiX />
          </ButtonClose>
        </Content>
        <Input name="name" placeholder="Nome" />
        <Input name="description" placeholder="Descrição" />

        <GroupForm>
          <Button type="submit">Salvar</Button>
          <Button type="button" backgroundColor="#c53030" onClick={setIsOpen}>
            Cancelar
          </Button>
        </GroupForm>
      </Form>
    </Modal>
  );
};

export default ModalEdit;
