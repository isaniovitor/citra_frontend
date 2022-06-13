import { useField } from '@unform/core';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import profile from '../../../assets/login/profile.png';

import * as S from './styles';

// import drop from '../../assets/operation/drop.svg';
// import greendrop from '../../assets/operation/greenDrop.svg';

interface DropProps {
  name: string;
}

function ImageInput({ name }: DropProps) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  // const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [preview, setPreview] = useState(defaultValue);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (onDropAcceptedFiles: any) => {
      if (inputRef.current) {
        inputRef.current.acceptedFiles = onDropAcceptedFiles;
      }
    },
  });

  const handlePreview = useCallback((e: any) => {
    const file = e.target.files[0];

    if (!file) {
      setPreview(null);
    }

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <S.DropConteiner
      {...getRootProps()}
      onClick={() => inputRef.current?.click()}
    >
      <input
        {...getInputProps()}
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handlePreview}
        multiple={false}
      />

      <S.Image src={preview || profile} alt="Preview" />
    </S.DropConteiner>
  );
}

export default ImageInput;
