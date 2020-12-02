import React, { useCallback, useRef, useState } from 'react';
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
import InputPassword from '../../../components/InputPassword';
import RadioBox from '../../../components/RadioBox';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAdd: (data: IRequest) => void;
}

const ModalAdd: React.FC<IModalProps> = ({ isOpen, setIsOpen, handleAdd }) => {
  const formRef = useRef<FormHandles>(null);
  const [clean, setClean] = useState(false);

  const handleSubmit = useCallback(
    async (data: IRequest) => {
      try {
        formRef.current?.setErrors({});

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

        handleAdd(data);
        // setIsOpen();
        setClean(true);
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
          <h2>Novo usuário</h2>
          <ButtonClose type="button" onClick={setIsOpen}>
            <FiX />
          </ButtonClose>
        </Content>
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
