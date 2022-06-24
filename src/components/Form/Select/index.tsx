import { useField } from '@unform/core';
import React, { useRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import './styles.css';

interface SelectProps {
  name: string;
  label: string;
  placeholder: string;
  noOptionMessage: string;
  options: any[];
}

function Select({
  name,
  label,
  placeholder,
  noOptionMessage,
  options,
  ...rest
}: SelectProps) {
  const selectRef = useRef(null);
  const { fieldName, registerField, error, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: ref => {
        if (ref.state.selectValue.length === 0) {
          return '';
        }
        return ref.state.selectValue[0].value;
      },
      setValue: (ref, newValue) => {
        // eslint-disable-next-line no-param-reassign
        ref.state.selectValue[0] = newValue;
      },
      clearValue: ref => {
        console.log(ref);
        // ref.state.selectValue.length
        // ref.select.clearValue();
        ref.state.selectValue[0] = { value: '', label: '' };
      },
    });
  }, [fieldName, registerField]);

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label htmlFor={fieldName} style={{ whiteSpace: 'nowrap' }}>
          {label}
        </label>
      )}
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        options={options}
        classNamePrefix="react-select"
        placeholder={placeholder}
        noOptionsMessage={() => noOptionMessage}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        styles={{
          control: (provided: any, state: { isFocused: any }) => ({
            ...provided,
            background: '#fff',
            borderRadius: '5px',
            height: '40px',
            width: '100%',
            boxShadow: state.isFocused ? null : null,
            border: '1px solid #ced4da',
            ':hover': {
              border: '1px solid #ced4da',
            },
          }),

          valueContainer: (provided: any) => ({
            ...provided,
            cursor: 'pointer',
            fontSize: '1rem',
            lineHeight: '22px',
            color: '#4C4C4C',
          }),

          input: (provided: any) => ({
            ...provided,
            margin: '0px',
            padding: '0px',
            height: '40px',
          }),
        }}
        {...rest}
      />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
}

export default Select;
