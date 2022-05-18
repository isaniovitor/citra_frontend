import * as Yup from 'yup';

export const registerUserSchema = Yup.object().shape({
  name: Yup.string().required('Campo Obrigatório'),
  email: Yup.string().required('Campo Obrigatório'),
  cep: Yup.string()
    .required('Campo Obrigatório')
    .test('completo', 'prencha corretamente', function test(item) {
      return !item?.includes('_');
    }),
  password: Yup.string().required('Campo Obrigatório'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('Confirm Password is required'),
  birthdate: Yup.string().required('Campo Obrigatório'),
  fone: Yup.string()
    .required('Campo Obrigatório')
    .test('completo', 'prencha corretamente', function test(item) {
      return !item?.includes('_');
    }),
  cpf: Yup.string()
    .required('Campo Obrigatório')
    .test('completo', 'prencha corretamente', function test(item) {
      return !item?.includes('_');
    }),
});

export const editUserSchema = Yup.object().shape({
  name: Yup.string().required('Campo Obrigatório'),
  email: Yup.string().required('Campo Obrigatório'),
  cep: Yup.string()
    .required('Campo Obrigatório')
    .test('completo', 'prencha corretamente', function test(item) {
      return !item?.includes('_');
    }),
  password: Yup.string().required('Campo Obrigatório'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('Confirm Password is required'),
  birthdate: Yup.string().required('Campo Obrigatório'),
  fone: Yup.string()
    .required('Campo Obrigatório')
    .test('completo', 'prencha corretamente', function test(item) {
      return !item?.includes('_');
    }),
  cpf: Yup.string()
    .required('Campo Obrigatório')
    .test('completo', 'prencha corretamente', function test(item) {
      return !item?.includes('_');
    }),
});

export const singInUserSchema = Yup.object().shape({
  email: Yup.string().required('Campo Obrigatório'),
  password: Yup.string().required('Campo Obrigatório'),
});
