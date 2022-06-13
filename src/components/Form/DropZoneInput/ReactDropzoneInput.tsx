import { useField } from '@unform/core';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import * as S from './styles';

// import drop from '../../assets/operation/drop.svg';
// import greendrop from '../../assets/operation/greenDrop.svg';
interface DropProps {
  name: string;
  label: string;
}

function ReactDropzoneInput({ name, label }: DropProps) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [file, setFile] = useState<any>();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'application/pdf',
    onDrop: (onDropAcceptedFiles: any) => {
      if (inputRef.current) {
        inputRef.current.acceptedFiles = onDropAcceptedFiles;
        console.log(inputRef.current.acceptedFiles);
      }
    },
  });

  const handlePreview = useCallback(e => {
    const newFile = e.target.files?.[0];

    if (!newFile) {
      setFile(null);
    }

    // console.log(e.target.files?.[0]);

    setFile(newFile);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      // getValue: ref => {
      //   return ref.acceptedFiles || [];
      // },
      clearValue(ref: HTMLInputElement) {
        ref.value = '';
      },
      setValue(_: HTMLInputElement, value: string) {
        // setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <S.Container
      {...getRootProps()}
      style={{ width: '100%' }}
      onClick={() => inputRef.current?.click()}
    >
      {label && <label htmlFor={fieldName + label}>{label}</label>}

      <S.Input
        {...getInputProps()}
        type="file"
        accept="application/pdf"
        ref={inputRef}
        multiple={false}
        // defaultValue={defaultValue}
        onChange={handlePreview}
      />

      <S.DropConteiner isDragActive={isDragActive}>
        {isDragActive ? (
          <p>
            <span>Solte aq</span>
          </p>
        ) : (
          <p>
            {file || defaultValue ? (
              <span>{defaultValue || file.name}</span>
            ) : (
              <>Selecione um arquivo ou arraste para cá!</>
            )}
          </p>
        )}
      </S.DropConteiner>

      {error && <span className="text-danger">{error}</span>}
    </S.Container>
  );
}

export default ReactDropzoneInput;
