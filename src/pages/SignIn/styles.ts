import styled from 'styled-components';

import backgroundImg from '../../assets/background.jpeg';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: url(${backgroundImg});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;

  header {
    display: flex;
    align-items: center;
    padding: 10px;
    height: 80px;

    a {
      background: var(--gray-dark);
      color: var(--white);
      padding: 14px 16px;
      border-radius: 20px;

      display: flex;
      align-items: center;
      justify-content: center;

      text-decoration: none;

      svg {
        margin-right: 10px;
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

export const Content = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  > div {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;

    img {
      margin-top: 15%;

      height: 90px;
    }
  }

  form {
    width: 100%;
    max-width: 400px;
    height: 100%;
    padding: 10px;
    background: var(--orange);
    border-radius: 50px;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    button[type='submit'] {
      width: 100%;
      margin-top: 10px;
    }
  }

  @media (max-width: 850px) {
    flex-direction: column;

    > div {
      img {
        margin: 0 0 20px;
        height: 65px;
      }
    }
  }

  @media (max-width: 450px) {
    padding: 0;

    form {
      max-width: 450px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;

export const Welcome = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;

  h1 {
    font-size: 30px;
    text-align: center;
  }

  p {
    width: 90%;
    font-size: 20px;
    text-align: center;
    margin: 20px 0;
  }
`;

export const FormContent = styled.div`
  width: 100%;
  max-width: 350px;
`;
