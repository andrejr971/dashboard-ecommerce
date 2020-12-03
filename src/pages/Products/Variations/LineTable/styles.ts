import styled from 'styled-components';

export const Container = styled.tr`
  background: var(--white);

  td {
    padding: 10px 15px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 20px;
      border: 2px solid var(--orange-dark);
    }

    &:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    &:nth-child(3) {
      div {
        width: 100%;
        display: flex;
        align-items: center;

        svg {
          margin-right: 5px;
        }
      }
    }

    &:last-child {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      text-align: right;

      div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
      }
    }

    span {
      display: none;
    }

    button {
      background: var(--orange-dark);
      border: 0;
      padding: 10px 15px;
      width: 50px;
      height: 50px;
      border-radius: 20px;

      svg {
        opacity: 0.8;
        color: var(--gray-dark);
        font-size: 20px;
      }

      &:hover {
        svg {
          opacity: 1;
        }
      }
    }

    a {
      text-decoration: none;
      background: var(--orange-dark);
      border: 0;
      padding: 10px 15px;
      width: 50px;
      height: 50px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        opacity: 0.8;
        color: var(--gray-dark);
        font-size: 20px;
        flex-shrink: 0;
      }

      margin-right: 10px;

      &:hover {
        svg {
          opacity: 1;
        }
      }
    }
  }

  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    border-radius: 20px;

    td {
      padding: 10px;
      border-radius: 0;

      img {
        width: 70px;
        height: 70px;
        margin: 0 auto;
      }

      span {
        display: block;
        font-size: 13px;
        opacity: 0.8;
      }

      & + td {
        padding-top: 0;
      }

      &:last-child {
        border-top-right-radius: 0;
        border-bottom-left-radius: 20px;
        background: var(--primary);
        padding-top: 10px;
        width: 100%;

        div {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 10px;

          button,
          a {
            width: 100%;
            margin-left: 0;
          }
        }
      }
    }

    & + tr {
      margin-top: 10px;
    }
  }
`;
