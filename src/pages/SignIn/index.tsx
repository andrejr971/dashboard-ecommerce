import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FiChevronLeft, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationsErrors';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import { useAuth, IRequest } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import InputPassword from '../../components/InputPassword';
import Button from '../../components/Button';

import { Container, Content, Welcome, FormContent } from './styles';

const SignIn: React.FC = () => {
  const { signIn, isLoading } = useAuth();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IRequest) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required('Username obrigatório'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Ocorreu um erro ao logar',
          description:
            'Pro favor, verifique as suas credenciais e tente novamente',
        });

        formRef.current?.clearField('password');
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <header>
        <a href="/">
          <FiChevronLeft />
          Ir para loja
        </a>
      </header>

      <Content>
        <div>
          <img src={logoImg} alt="logo DreShoes" />
        </div>

        <Form onSubmit={handleSubmit} ref={formRef}>
          <Welcome>
            <h1>Seja bem-vindo a plataforma</h1>
            <p>Faça o logon para poder usar a plataforma</p>
          </Welcome>

          <FormContent>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              icon={FiUser}
            />
            <InputPassword placeholder="Senha" name="password" icon={FiLock} />
            <Button type="submit">
              {isLoading ? 'Carregando...' : 'Acessar'}
            </Button>
          </FormContent>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
