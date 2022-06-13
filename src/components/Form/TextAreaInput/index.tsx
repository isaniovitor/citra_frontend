import { useField } from '@unform/core';
import type { TextareaHTMLAttributes } from 'react';
import React, { useEffect, useRef } from 'react';

import * as S from './styles';

interface Props {
  name: string;
  note?: string;
  label?: string;
  multiline?: string;
}

type TextAreaInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & Props;

function TextAreaInput({
  label,
  note,
  name,
  multiline,
  ...rest
}: TextAreaInputProps) {
  const TextAreaInputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const props = {
    ...rest,
    ref: TextAreaInputRef,
    id: fieldName,
    'aria-label': label,
    defaultValue,
  };

  function resizeTextArea() {
    // TextAreaInputRef.current.style.height = '0px';
    // const { scrollHeight } = TextAreaInputRef.current;
    // TextAreaInputRef.current.style.height = `${scrollHeight}px`;
    // console.log(TextAreaInputRef.current.value);
  }

  useEffect(() => {
    resizeTextArea();
    registerField({
      name: fieldName,
      ref: TextAreaInputRef,
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

  // useEffect(() => {
  //   // TextAreaInputRef.current.style.height = '0px';
  //   const { scrollHeight } = TextAreaInputRef.current;
  //   TextAreaInputRef.current.style.height = `${scrollHeight}px`;
  // }, []);

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

      <S.TextAreaInput {...props} onChange={resizeTextArea} rows={6} />

      {error && <span className="text-danger">{error}</span>}
    </div>
  );
}

export default TextAreaInput;
