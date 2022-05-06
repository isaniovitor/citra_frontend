import { useField } from '@unform/core';
import type { InputHTMLAttributes } from 'react';
import { useRef, useEffect } from 'react';

// import * as S from './styles';

interface Props {
  name: string;
  mask?: string;
  value?: string;
  size?: number;
  label: string;
  type?: string;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props;

function Input(
  { name, mask, type, label, value, size }: InputProps,
  ...rest: any[]
) {
  const inputRef = useRef(null);
  console.log(mask, type, value, size, ...rest);

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
    <>
      <label htmlFor={fieldName}>{label}</label>
      <input id={fieldName} ref={inputRef} defaultValue={defaultValue} />
      {error && <span className="error">{error}</span>}
    </>
  );
}

export default Input;
