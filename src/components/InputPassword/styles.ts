import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 52px;
  padding: 14px 16px;
  border: 2px solid var(--orange-dark);
  background: var(--white);
  border-radius: 20px;
  display: flex;
  align-items: center;

  color: var(--primary);

  svg {
    flex-shrink: 0;
    margin-right: 10px;
    opacity: 0.5;
  }

  & + div {
    margin-top: 10px;
  }

  input {
    width: 100%;
    background: transparent;
    border: 0;

    color: var(--primary);
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background: transparent;
    border: 0;

    svg {
      margin: 0;
      height: 20px;
    }
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
      color: #c53030;

      svg {
        opacity: 1;
      }
    `};

  ${props =>
    props.isFocused &&
    css`
      border-color: var(--gray-dark);
      color: var(--gray-dark);

      svg {
        opacity: 1;
      }
    `};

  ${props =>
    props.isFilled &&
    css`
      color: var(--gray-dark);

      svg {
        opacity: 1;
      }
    `};
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 10px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
