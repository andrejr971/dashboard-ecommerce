import React, { useCallback } from 'react';
import { FiTrash } from 'react-icons/fi';

import { Container } from './styles';

interface ISize {
  size: string;
  quantity: string;
}

interface InputSizeProps {
  info: ISize;
  index: number;
  handleDelete(index: number): void;
}

const InputsSize: React.FC<InputSizeProps> = ({
  info,
  index,
  handleDelete,
}) => {
  const handleSubmitDelete = useCallback(() => {
    handleDelete(index);
  }, [index, handleDelete]);

  return (
    <Container>
      <div>{info.size}</div>
      <div>{info.quantity}</div>
      <button type="button" onClick={handleSubmitDelete}>
        <FiTrash />
      </button>
    </Container>
  );
};

export default InputsSize;
