import styled, { css } from 'styled-components';

interface LabelProps {
  isChecked: string;
}

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled.label<LabelProps>`
  width: 100%;
  height: 52px;
  padding: 14px 16px;
  border: 2px solid var(--orange-dark);
  background: var(--white);
  border-radius: 20px;
  display: flex;
  align-items: center;

  color: var(--primary);

  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  input {
    display: none;
  }

  ${props =>
    props.isChecked === 'moderator' &&
    css`
      &[for='moderator'] {
        border-color: var(--gray-dark);
      }
    `}

  ${props =>
    props.isChecked === 'administrator' &&
    css`
      &[for='administrator'] {
        border-color: var(--gray-dark);
      }
    `}

  svg {
    margin-right: 10px;
    font-size: 20px;
    flex-shrink: 0;
  }
`;
