import { useField } from '@unform/core';
import type { InputHTMLAttributes } from 'react';
import { useRef, useEffect } from 'react';
// import ReactInputMask from 'react-input-mask';
import ReactInputMask from 'react-input-mask';
import { Input as InputStrp } from 'reactstrap';

import * as S from './styles';

interface Props {
  name: string;
  mask?: string;
  label?: string;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props;

function Input({ name, mask, label, ...rest }: InputProps) {
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

      <InputStrp
        as={ReactInputMask}
        mask={mask}
        name={name}
        id={fieldName}
        innerRef={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default Input;
