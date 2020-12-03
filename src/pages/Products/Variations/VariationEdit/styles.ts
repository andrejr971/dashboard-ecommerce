import styled, { css } from 'styled-components';
import Tooltip from '../../../../components/Tooltip';

interface ContainerCurrentProps {
  isFilled: boolean;
  isErrored?: boolean;
}

export const Container = styled.div`
  width: 100%;
  padding: 10px;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 5px;

    h1 {
      font-size: 25px;
    }

    button {
      margin-left: 20px;
    }
  }
`;

export const ContentRight = styled.div`
  display: flex;
  align-items: center;
`;

export const Main = styled.main`
  width: 100%;
  max-width: 900px;
  margin: 20px auto;

  div.quill {
    border: 0;
    /* background: var(--white); */
  }

  div.ql-toolbar.ql-snow,
  div.ql-container.ql-snow {
    border: 0;
    background: var(--white);
  }

  div.ql-toolbar.ql-snow span.ql-formats button svg {
    color: #fff;
    font-size: 17px;
  }

  div.ql-editor {
    background: var(--white);
    color: var(--primary);
    font-size: 17px;
    border: 2px solid var(--orange-dark);
    border-radius: 20px;

    &:focus {
      border-color: var(--gray-dark);
    }
  }
`;

export const ContainerCurrent = styled.div<ContainerCurrentProps>`
  width: 100%;
  height: 52px;
  padding: 14px 16px;
  border: 2px solid var(--orange-dark);
  background: var(--white);
  border-radius: 16px;
  display: flex;
  align-items: center;

  color: var(--primary);

  svg {
    margin-right: 10px;
    opacity: 0.5;
    flex-shrink: 0;
  }

  & + div {
    margin-top: 10px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;

    color: var(--primary);
  }

  &:focus-within {
    border-color: var(--gray-dark);
    color: var(--gray-dark);
    svg {
      opacity: 1;
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

export const GroupForm = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  button {
    padding: 15px 16px;

    background: var(--orange-dark);
    color: var(--gray-dark);

    & + button {
      background: var(--gray-dark);
      color: var(--white);
    }

    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;

    span {
      margin-right: 10px;
    }

    svg {
      font-size: 20px;
    }

    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }

    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 775px) {
    grid-template-columns: 1fr;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const ContentImges = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
