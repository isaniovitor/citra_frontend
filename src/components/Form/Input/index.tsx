import { useField } from '@unform/core';
import type { InputHTMLAttributes } from 'react';
import { useRef, useEffect } from 'react';

import * as S from './styles';

interface Props {
  name: string;
  mask?: string;
  label?: string;
  type?: string;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props;

function Input({ name, mask, label, type, ...rest }: InputProps) {
  const inputRef = useRef(null);
  // console.log(mask, rest.type, mask);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value;
      },
      setValue: (ref, newValue) => {
        // eslint-disable-next-line no-param-reassign
        ref.current.value = newValue;
      },
      clearValue: ref => {
        // eslint-disable-next-line no-param-reassign
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderBottom: 'none',
        gap: '3px',
      }}
    >
      {label && <label htmlFor={fieldName}>{label}</label>}

      <S.Input
        type={type || 'text'}
        mask={mask || ''}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && <span className="text-danger">{error}</span>}
    </div>
  );
}

export default Input;
