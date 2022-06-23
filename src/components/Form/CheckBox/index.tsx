import { useField, SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import type { InputHTMLAttributes } from 'react';
import { useEffect, useRef } from 'react';

/**
 * This example renders one checkbox. If you want to render multiple options,
 * check the other checkbox example, or adapt this one.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
 */

interface Props {
  name: string;
  label?: string;
  value?: string;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props;

function Checkbox({ name, value, label, ...rest }: InputProps) {
  const inputRef = useRef();
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const defaultChecked = defaultValue === value;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.checked;
      },
      clearValue: ref => {
        /**
         * If you want to change the default checked for false or true,
         * you can do so here. In this example, when resetting the form,
         * the checkbox goes back to its initial state.
         */
        // ref.current.checked = defaultChecked;
      },
      setValue: (ref, newValue) => {
        // ref.current.checked = newValue;
      },
    });
  }, [defaultValue, fieldName, registerField, defaultChecked]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '5px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input
          defaultChecked={defaultChecked}
          ref={inputRef}
          value={value}
          type="checkbox"
          id={fieldName}
          {...rest}
        />

        <span key={fieldName}>{label}</span>
      </div>

      {error && <span className="text-danger">{error}</span>}
    </div>
  );
}

export default Checkbox;
