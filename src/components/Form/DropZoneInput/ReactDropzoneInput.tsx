import { useField } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';
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
  const { fieldName, registerField } = useField(name);
  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'pdf/*',
    onDrop: (onDropAcceptedFiles: any) => {
      if (inputRef.current) {
        inputRef.current.acceptedFiles = onDropAcceptedFiles;
        setAcceptedFiles(onDropAcceptedFiles);
      }
    },
  });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: ref => {
        return ref.acceptedFiles || [];
      },
      clearValue: ref => {
        ref.acceptedFiles = [];
        setAcceptedFiles([]);
      },
      setValue: (ref, value: any) => {
        ref.acceptedFiles = value;
        setAcceptedFiles(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <div
      {...getRootProps()}
      onClick={() => inputRef.current?.click()}
      style={{ width: '100%', height: '40px' }}
    >
      {label && <label htmlFor={fieldName + label}>{label}</label>}

      <S.Input {...getInputProps()} accept="pdf/*" ref={inputRef} />

      <S.DropConteiner isDragActive={isDragActive}>
        {/* <img src={isDragActive ? greendrop : drop} alt="dropIcon" /> */}

        {isDragActive ? (
          <p>Solte aqui</p>
        ) : (
          <p>
            <span className="greenText">Selecione um arquivo&nbsp;</span>
            ou arraste para cá
          </p>
        )}
      </S.DropConteiner>

      {/* {acceptedFiles.length !== 0 && (
        <S.ImagesConteiner>
          {acceptedFiles.map((file, index) => {
            const url = URL.createObjectURL(file);

            return (
              <div key={index}>
                {console.log(url)}
                <img src={url} style={{ width: '100%', height: '100px' }} />
              </div>
            );
          })}
        </S.ImagesConteiner>
      )} */}
    </div>
  );
}

export default ReactDropzoneInput;
