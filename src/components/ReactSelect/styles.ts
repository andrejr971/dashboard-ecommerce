import styled from 'styled-components';

export const Container = styled.div`
  .select {
    width: 100%;
    color: var(--primary);

    .select__control {
      border: 2px solid var(--orange-dark);
      border-radius: 20px;
      height: 52px;
      padding: 0 10px;
      background: var(--white);

      &:focus-within {
        border-color: var(--gray-dark);
      }
    }

    .select__single-value {
      color: var(--primary);
    }

    .select__menu {
      background: var(--white);
    }

    .select__option:hover {
      background: var(--background);
    }
  }
`;
