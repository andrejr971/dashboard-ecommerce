import React from 'react';
import { FiX } from 'react-icons/fi';

import { Container, Content, BackgroundContent } from './styles';

interface IModalProps {
  title?: string;
  visible: boolean;
  setVisible(visible: boolean): void;
}

const Modal: React.FC<IModalProps> = ({
  children,
  visible,
  setVisible,
  title,
}) => {
  document.addEventListener('keyup', ({ code }) => {
    if (code === 'Escape' && visible) {
      setVisible(false);
    }
  });

  return (
    <Container visible={visible}>
      <BackgroundContent onClick={() => setVisible(false)} />
      <Content>
        <header>
          {title && <h2>{title}</h2>}

          <button type="button" onClick={() => setVisible(false)}>
            <FiX />
          </button>
        </header>
        {children}
      </Content>
    </Container>
  );
};

export default Modal;
