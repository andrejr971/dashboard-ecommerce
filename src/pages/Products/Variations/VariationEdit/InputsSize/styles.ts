import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 10px;

  display: grid;
  grid-template-columns: 1fr 1fr 50px;
  gap: 10px;

  div {
    width: 100%;
    height: 52px;
    padding: 14px 16px;
    background: var(--white);
    border-radius: 20px;
    border: 2px solid var(--orange-dark);
  }

  button {
    width: 50px;
    height: 50px;
    background: var(--red);
    color: var(--white);
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 20px;
    }

    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
`;
