import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  main {
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    padding: 10px;

    nav {
      display: grid;
      grid-template-columns: repeat(2, minmax(350px, 1fr));
      gap: 10px;

      a {
        width: 100%;
        height: 120px;
        padding: 14px 16px;
        border-radius: 20px;

        display: flex;
        align-items: center;
        text-decoration: none;
        background: var(--white);

        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
        border: 2px solid var(--orange-dark);
        color: inherit;

        svg {
          font-size: 50px;
          color: var(--orange-dark);
          margin-right: 20px;
        }

        font-size: 25px;

        &:hover {
          border-color: var(--gray-dark);

          svg {
            color: var(--gray-dark);
          }
        }
      }
    }
  }
`;
