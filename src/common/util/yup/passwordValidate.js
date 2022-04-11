/* eslint-disable func-names */
const errorMessage = 'Sua senha deve ter ao menos 6 caracteres';

export function passwordValidate() {
  return this.test('passwordValidation', errorMessage, function (value = '') {
    const { path, createError } = this;

    return (
      (value && value.length >= 6) ||
      createError({ path, message: errorMessage })
    );
  });
}
