import styled from 'styled-components';

interface ContentProps {
  isVisible: boolean;
}

export const Container = styled.div`
  @media (min-width: 875px) {
    display: none;
  }

  z-index: 9999999;
`;

export const ButtonMenu = styled.button`
  margin-left: 20px;
  background: var(--gray-dark);
  color: var(--white);
  padding: 14px 16px;
  width: 50px;
  height: 50px;
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;

  svg {
    font-size: 20px;
  }

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
`;

export const Nav = styled.nav<ContentProps>`
  position: fixed;
  top: 0;
  left: 0;
  background: var(--orange);

  display: ${props => (props.isVisible ? 'initial' : 'none')};

  width: 100vw;
  height: 100vh;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
  padding: 10px;

  button {
    width: 100%;
    height: 52px;
    font-weight: 500;
    border: 0;
    border-bottom: 2px solid transparent;

    & + button {
      margin-top: 10px;
    }

    &.active {
      border-color: var(--gray-dark);
    }
  }

  header {
    position: absolute;
    top: 10px;
    right: 10px;

    button {
      background: var(--gray-dark);
      color: var(--white);
      padding: 14px 16px;
      width: 50px;
      height: 50px;
      border-radius: 20px;

      display: flex;
      align-items: center;
      justify-content: center;

      text-decoration: none;

      svg {
        font-size: 20px;
      }

      transition: opacity 0.2s;

      &:hover {
        opacity: 0.9;
      }

      box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    }
  }
`;
