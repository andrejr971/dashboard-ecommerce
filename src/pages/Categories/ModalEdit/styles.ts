import styled from 'styled-components';

export const Container = styled.div``;

export const GroupForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  div {
    margin: 0;
  }

  & + div {
    margin-top: 10px;
  }

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;

export const Content = styled.div`
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
