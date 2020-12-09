import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import {
  FiAlertCircle,
  FiArrowLeft,
  FiDollarSign,
  FiSave,
} from 'react-icons/fi';
import { MdTextFields, MdTitle } from 'react-icons/md';
import { useHistory, useParams } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import slugify from 'slugify';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../../../utils/getValidationsErrors';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import TextArea from '../../../../components/TextArea';
import InputSize from './InputSize';
import InputImage from '../../../../components/InputImage';
import InputsSize from './InputsSize';

import {
  Container,
  GroupForm,
  Main,
  ContainerCurrent,
  Error,
  Content,
  ContentImges,
} from './styles';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';

interface ISize {
  size: string;
  quantity: string;
}

interface IRequest {
  name: string;
  slug: string;
  description: string;
}

interface IParams {
  id: string;
  slug: string;
}

interface IProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: {
    id: number;
    image_url: string;
  }[];
  sizes: {
    id: number;
    size: string;
    quantity: string;
  }[];
}

const VariationEdit: React.FC = () => {
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [price, setPrice] = useState<string | undefined>('');
  const [error, setError] = useState('');
  const [slug, setSlug] = useState('');
  const [sizes, setSizes] = useState<ISize[]>([]);

  const { id, slug: nameSlug } = useParams<IParams>();

  const { addToast } = useToast();

  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const loadData = useCallback(async () => {
    const response = await api.get(`product-variations/${nameSlug}`);

    setProduct(response.data);
    setPrice(response.data.price);
    setSlug(response.data.slug);

    const { sizes: arraySize } = response.data as IProduct;

    setSizes(
      arraySize.map(s => ({
        size: s.size,
        quantity: s.quantity,
      })),
    );
  }, [nameSlug]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleGoBack = useCallback(() => {
    history.go(-1);
  }, [history]);

  const handleSlug = useCallback(value => {
    setSlug(slugify(value.toLowerCase(), '-'));
  }, []);

  const handleAddSize = useCallback(
    (data: ISize) => {
      setSizes([...sizes, data]);
    },
    [sizes],
  );

  const handleRemoveSize = useCallback(
    (index: number) => {
      const filterSizes = sizes.filter(
        (size, indexSize) => indexSize !== index,
      );
      setSizes(filterSizes);
    },
    [sizes],
  );

  const handleImage01 = useCallback(
    async (data: File) => {
      const dataForm = new FormData();
      dataForm.append('image', data);
      if (product.images[0]) {
        await api.post(
          `product-variations/${product.id}/image/${product.images[0].id}`,
          dataForm,
        );
      } else {
        await api.post(`product-variations/${product.id}/image`, dataForm);
      }
    },
    [product],
  );

  const handleImage02 = useCallback(
    async (data: File) => {
      const dataForm = new FormData();
      dataForm.append('image', data);
      if (product.images[1]) {
        await api.post(
          `product-variations/${product.id}/image/${product.images[1].id}`,
          dataForm,
        );
      } else {
        await api.post(`product-variations/${product.id}/image`, dataForm);
      }
    },
    [product],
  );

  const handleImage03 = useCallback(
    async (data: File) => {
      const dataForm = new FormData();
      dataForm.append('image', data);
      if (product.images[2]) {
        await api.post(
          `product-variations/${product.id}/image/${product.images[2].id}`,
          dataForm,
        );
      } else {
        await api.post(`product-variations/${product.id}/image`, dataForm);
      }
    },
    [product],
  );
  const handleImage04 = useCallback(
    async (data: File) => {
      const dataForm = new FormData();
      dataForm.append('image', data);
      if (product.images[3]) {
        await api.post(
          `product-variations/${product.id}/image/${product.images[3].id}`,
          dataForm,
        );
      } else {
        await api.post(`product-variations/${product.id}/image`, dataForm);
      }
    },
    [product],
  );

  const handleSubmit = useCallback(
    async (data: IRequest) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          slug: Yup.string().required('Descrição obrigatório'),
          description: Yup.string().required('Descrição obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // if (!image01) {
        //   addToast({
        //     type: 'error',
        //     title: 'Pelo menos uma imagem é necessária',
        //   });
        //   return;
        // }

        if (!price) {
          setError('Preço é necessario');
          return;
        }

        const { length } = sizes;

        if (length === 0) {
          addToast({
            type: 'error',
            title: 'Pelo menos um tamanho é necessário',
          });
          return;
        }

        const dataForm = new FormData();
        dataForm.append('name', data.name);
        dataForm.append('slug', data.slug);
        dataForm.append('description', data.description);
        // dataForm.append('images0', image01);

        // if (image02) {
        //   dataForm.append('images1', image02);
        // }
        // if (image03) {
        //   dataForm.append('images2', image03);
        // }
        // if (image04) {
        //   dataForm.append('images3', image04);
        // }

        let size = '';
        let quantity = '';

        sizes.forEach((s, index) => {
          size += `${s.size}${length - 1 !== index ? ',' : ''}`;
          quantity += `${s.quantity}${length - 1 !== index ? ',' : ''}`;
        });

        dataForm.append('sizes', size);
        dataForm.append('quantity', quantity);
        dataForm.append('price', price?.toString().replace(/,/g, '.'));

        await api.put(`product-variations/${id}`, {
          name: data.name,
          slug: data.slug,
          description: data.description,
          sizes: size,
          quantity,
          price: price?.toString().replace(/,/g, '.'),
        });

        addToast({
          type: 'success',
          title: 'Sucesso ao atualizar',
        });

        handleGoBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Falha ao cadastar',
        });
      }
    },
    [addToast, sizes, id, price, handleGoBack],
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={product} ref={formRef}>
        <header>
          <h1>Editar variação</h1>
        </header>

        <Main>
          <Content>
            <Input
              name="name"
              placeholder="Nome do produto"
              icon={MdTitle}
              onChange={({ target }) => handleSlug(target.value)}
            />
            <Input
              name="slug"
              placeholder="Slug do produto"
              icon={MdTitle}
              value={slug}
              onChange={({ target }) => handleSlug(target.value)}
            />

            <ContainerCurrent
              isErrored={!!error}
              isFilled={!!price}
              id="current"
            >
              <FiDollarSign />
              <CurrencyInput
                name="price"
                placeholder="Preço"
                decimalSeparator=","
                groupSeparator=""
                value={price}
                onChange={data => setPrice(data)}
                autoComplete="off"
              />

              {error && (
                <Error title={error}>
                  <FiAlertCircle size={20} />
                </Error>
              )}
            </ContainerCurrent>

            <TextArea
              name="description"
              placeholder="Descrição"
              icon={MdTextFields}
            />

            <ContentImges>
              {product.images && (
                <>
                  <InputImage
                    imageURL={
                      product.images[0] ? product.images[0].image_url : ''
                    }
                    onFileUploaded={handleImage01}
                  />
                  <InputImage
                    imageURL={
                      product.images[1] ? product.images[1].image_url : ''
                    }
                    onFileUploaded={handleImage02}
                  />
                  <InputImage
                    imageURL={
                      product.images[2] ? product.images[2].image_url : ''
                    }
                    onFileUploaded={handleImage03}
                  />
                  <InputImage
                    imageURL={
                      product.images[3] ? product.images[3].image_url : ''
                    }
                    onFileUploaded={handleImage04}
                  />
                </>
              )}
            </ContentImges>

            <InputSize handleAdd={handleAddSize} />

            {sizes.map((size, index) => (
              <InputsSize
                key={index}
                index={index}
                info={size}
                handleDelete={handleRemoveSize}
              />
            ))}

            <GroupForm>
              <Button type="button" onClick={handleGoBack}>
                <span>Cancelar</span>
                <FiArrowLeft />
              </Button>
              <Button type="submit">
                <span>Salvar</span>
                <FiSave />
              </Button>
            </GroupForm>
          </Content>
        </Main>
      </Form>
    </Container>
  );
};

export default VariationEdit;
