import styled, { css } from 'styled-components';

interface ContainerProps {
  isFilled: boolean;
  isProfile?: boolean;
  isIcon?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 350px;
  height: 200px;
  margin: 0 auto 10px;
  background: var(--white);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;

  cursor: pointer;
  border: 2px solid var(--orange-dark);

  &:hover {
    border-color: var(--gray-dark);

    p svg {
      color: var(--gray-dark);
    }
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
  }

  p {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    border-radius: 20px;
    border: 1px dashed var(--orange-dark);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--primary);
    opacity: 0.9;

    svg {
      color: var(--primary);
      width: 24px;
      height: 24px;
      margin-bottom: 8px;
    }
  }

  ${props =>
    props.isFilled &&
    css`
      border-color: var(--orange-dark);
    `};

  ${props =>
    props.isProfile &&
    css`
      max-width: 200px;
      height: 200px;

      border-radius: 50%;

      img {
        border-radius: 50%;
      }

      p {
        border-radius: 50%;
      }
    `};

  ${props =>
    props.isIcon &&
    css`
      max-width: 150px;
      height: 150px;

      border-radius: 20px;

      img {
        border-radius: 20px;
      }
    `};
`;
