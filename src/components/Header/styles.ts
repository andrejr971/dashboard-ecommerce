import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999999;

  background: var(--background);
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1260px;
  padding: 10px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled(Link)`
  text-decoration: none;

  > img {
    height: 50px;
  }

  div {
    display: none;
  }

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 950px) {
    > img {
      display: none;
    }

    div {
      display: flex;

      img {
        display: initial;
        width: 50px;
        height: 50px;
      }
    }
  }
`;

export const Profile = styled(Link)`
  text-decoration: none;

  display: flex;
  align-items: center;

  color: var(--primary);

  strong {
    margin-left: 10px;
    font-weight: 500;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 20px;
    border: 2px solid var(--orange-dark);
  }

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 875px) {
    strong {
      display: none;
    }
  }
`;

export const ButtonLogout = styled.button`
  margin-left: 20px;
  background: var(--gray-dark);
  color: var(--white);
  padding: 14px 16px;
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;

  svg {
    margin-left: 10px;
    font-size: 20px;
  }

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);

  @media (max-width: 875px) {
    display: none;
    /* width: 50px;
    height: 50px;
    margin-left: 10px;

    span {
      display: none;
    }

    svg {
      margin: 0;
    } */
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
`;

export const Nav = styled.nav`
  flex: 1;
  width: 100%;

  ul {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    li {
      a {
        padding: 10px 16px;
        text-decoration: none;
        font-weight: 500;
        color: var(--primary);
        position: relative;
        text-align: center;

        &:hover,
        &.active {
          &::before {
            content: '';
            display: block;
            width: 10px;
            height: 10px;
            border-radius: 5px;
            background: var(--red);

            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -5px;
          }
        }
      }

      & + li {
        margin-left: 10px;
      }
    }
  }

  @media (max-width: 875px) {
    display: none;
  }
`;
