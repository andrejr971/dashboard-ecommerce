import styled, { keyframes } from 'styled-components';

import ReactModal from 'react-modal';

interface ContainerProps {
  visible: boolean;
}

export const Container = styled(ReactModal)`
  &.Modal {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999999;
    background: var(--background);

    width: 100%;
    max-width: 700px;

    @media (max-width: 450px) {
      padding: 10px;
    }
  }

  &.Overlay {
    position: fixed;
    /* top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%); */
    background: rgba(0, 0, 0, 0.3);
  }

  width: 100vw;
  height: 100vh;
`;

export const BackgroundContent = styled.div`
  background: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1001;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 7px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.15);
  }
`;

const appearFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;
  margin-top: 10px;
  padding: 10px;
  z-index: 1001;
  background: var(--white);
  border-radius: 5px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);

  animation: ${appearFromTop} 0.5s;

  header {
    display: flex;
    width: 100%;
    position: relative;

    h2 {
      flex: 1;
      padding-bottom: 15px;
      text-align: left;
      border-bottom: 1px solid var(--orange);
      margin-bottom: 10px;
      font-size: 20px;
    }
  }

  @media (max-width: 750px) {
    max-width: 500px;

    header {
      h2 {
        padding-right: 10px;
      }
    }
  }

  @media (max-width: 550px) {
    max-width: 400px;
  }
`;

export const ButtonClose = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: 0;
  padding: 5px;
  background: var(--orange-dark);
  /* width: 50px;
  height: 50px; */
  border-radius: 5px;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 20px;
    margin: 0;
    color: var(--primary);
  }
`;
