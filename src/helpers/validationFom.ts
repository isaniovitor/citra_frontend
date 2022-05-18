import * as Yup from 'yup';

export async function validationForm(data: any, schema: any, formRef: any) {
  let isSuccess = false;

  try {
    await schema.validate(data, {
      abortEarly: false,
    });

    // Validation passed
    isSuccess = true;
  } catch (err) {
    console.log(err);

    const validationErrors = {};

    if (err instanceof Yup.ValidationError) {
      err.inner.forEach(error => {
        validationErrors[error.path] = error.message;
      });

      formRef.current.setErrors(validationErrors);
    }
  }

  return isSuccess;
}
