import * as Yup from 'yup';

// user
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
  privacy: Yup.boolean().test(
    'termos',
    'Aceite os termos',
    function test(item) {
      return !!item;
    },
  ),
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

// jobs
export const applySchema = Yup.object().shape({
  cv: Yup.mixed().required('A file is required'),
});

export const registerJobSchema = Yup.object().shape({
  nameVacancy: Yup.string().required('Campo Obrigatório'),
  nameCompany: Yup.string().required('Campo Obrigatório'),
  shifts: Yup.string().required('Campo Obrigatório'),
  fone: Yup.string()
    .required('Campo Obrigatório')
    .test('completo', 'prencha corretamente', function test(item) {
      return !item?.includes('_');
    }),
  cep: Yup.string()
    .required('Campo Obrigatório')
    .test('completo', 'prencha corretamente', function test(item) {
      return !item?.includes('_');
    }),
  salary: Yup.string()
    .required('Campo Obrigatório')
    .test('completo', 'prencha com número positivo', function test(item) {
      return Number(item) > 0;
    }),
  typeRemuneration: Yup.string().required('Campo Obrigatório'),
  description: Yup.string().required('Campo Obrigatório'),
});
