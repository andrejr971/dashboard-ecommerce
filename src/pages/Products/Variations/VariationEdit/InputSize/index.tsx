import React, { useCallback, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import { Container } from './styles';

interface ISize {
  size: string;
  quantity: string;
}

interface InputSizeProps {
  handleAdd(data: ISize): void;
}

const InputSize: React.FC<InputSizeProps> = ({ handleAdd }) => {
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = useCallback(() => {
    if (!size) return;
    if (!quantity) return;

    handleAdd({
      size,
      quantity,
    });

    setSize('');
    setQuantity('');
  }, [handleAdd, quantity, size]);

  return (
    <Container>
      <input
        name="size"
        placeholder="Tamanho"
        value={size}
        onChange={({ target }) => setSize(target.value)}
      />
      <input
        name="quantity"
        placeholder="Quantidade"
        value={quantity}
        onChange={({ target }) => setQuantity(target.value)}
      />
      <button type="button" onClick={handleSubmit}>
        <FiPlus />
      </button>
    </Container>
  );
};

export default InputSize;
