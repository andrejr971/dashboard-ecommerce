/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, InputHTMLAttributes, useState } from 'react';
import { useField } from '@unform/core';
import { FiUser } from 'react-icons/fi';
import { Container, Label } from './styles';

interface RadioBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  clean?: boolean;
  setClean(clean: boolean): void;
}

const RadioBox: React.FC<RadioBoxProps> = ({
  name,
  clean,
  setClean,
  ...rest
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [isChecked, setIsChecked] = useState(defaultValue);

  useEffect(() => {
    if (clean) {
      setIsChecked('');
      setClean(false);
    }
  }, [clean, setClean]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(ref => {
          ref.checked = false;
        });
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <Container>
      <Label htmlFor="moderator" isChecked={isChecked}>
        <input
          ref={ref => {
            inputRefs.current[0] = ref as HTMLInputElement;
          }}
          name={name}
          value="0"
          type="radio"
          id="moderator"
          onChange={() => setIsChecked('moderator')}
          defaultChecked={defaultValue === 'moderator'}
          {...rest}
        />
        <FiUser />
        Usuário
      </Label>

      <Label htmlFor="administrator" isChecked={isChecked}>
        <input
          ref={ref => {
            inputRefs.current[1] = ref as HTMLInputElement;
          }}
          name={name}
          value="1"
          type="radio"
          id="administrator"
          onChange={() => setIsChecked('administrator')}
          defaultChecked={defaultValue === 'administrator'}
          {...rest}
        />
        <FiUser />
        Administrador
      </Label>
    </Container>
  );
};

export default RadioBox;
