import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiX } from 'react-icons/fi';
import Modal from '../../../components/Modal';
import getValidationErrors from '../../../utils/getValidationsErrors';

import { IRequest } from '..';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { ButtonClose, Content, GroupForm } from './styles';
import ReactSelect from '../../../components/ReactSelect';
import { useCategory } from '../../../hooks/categories';
import { useBrand } from '../../../hooks/brand';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAdd: (data: IRequest) => void;
}

const ModalAdd: React.FC<IModalProps> = ({ isOpen, setIsOpen, handleAdd }) => {
  const formRef = useRef<FormHandles>(null);

  const { categories } = useCategory();
  const { brands } = useBrand();

  const handleSubmit = useCallback(
    async (data: IRequest) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        handleAdd(data);
        // setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleAdd],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Content>
          <h2>Novo produto</h2>
          <ButtonClose type="button" onClick={setIsOpen}>
            <FiX />
          </ButtonClose>
        </Content>
        <Input name="name" placeholder="Nome" />
        <GroupForm>
          <ReactSelect
            name="category"
            options={categories.map(category => ({
              label: category.name,
              value: category.id,
            }))}
            placeholder="Categoria"
          />
          <ReactSelect
            name="brand"
            options={brands.map(brand => ({
              label: brand.name,
              value: brand.id,
            }))}
            placeholder="Marca"
          />
        </GroupForm>

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

export default ModalAdd;
