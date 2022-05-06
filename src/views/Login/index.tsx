import { Form } from '@unform/web';
import React, { useRef } from 'react';

import Input from '../../components/Form/Input';
// import { Container } from './styles';

function Login() {
  const formRef = useRef(null);

  function handleSubmit(data: any, { reset }: any) {
    console.log(data, formRef, reset);
  }

  return (
    <div>
      <h1>Cadastrar Operação</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input label="Name" name="name" />
      </Form>
    </div>
  );
}

export default Login;
