import styled from 'styled-components';

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

    a {
      margin-left: 20px;
      background: var(--orange-dark);
      color: var(--gray-dark);
      padding: 15px 16px;

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

      @media (max-width: 775px) {
        width: 50px;
        height: 50px;
        margin-left: 10px;

        span {
          display: none;
        }

        svg {
          margin: 0;
        }
      }
    }
  }

  main {
    width: 100%;
    max-width: 700px;
    margin: 20px auto;

    form {
      width: 100%;
      max-width: 350px;
      margin: 0 auto;

      display: flex;
      align-items: center;
      flex-direction: column;

      button {
        width: 100%;
        margin-top: 10px;
      }

      > div {
        flex: 1;
      }

      @media (max-width: 500px) {
        button {
          margin-top: 10px;
        }
      }
    }
  }
`;

export const ContentRight = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
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
    margin-right: 10px;
    opacity: 0.5;
  }

  &:focus-within {
    border-color: var(--gray-dark);
    color: var(--gray-dark);

    svg {
      opacity: 1;
    }
  }

  @media (max-width: 775px) {
    display: none;
  }
`;

export const Table = styled.table`
  margin-top: 10px;
  width: 100%;
  text-align: left;
  border-collapse: separate;
  border-spacing: 0 10px;

  @media (max-width: 775px) {
    thead {
      display: none;
    }
  }
`;

export const Thead = styled.thead`
  tr th {
    padding: 0 15px;

    &:last-child {
      text-align: right;
    }
  }
`;
