import yup from 'common/util/yup';

const form = {
  defaultValues: {
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  },
  validations: {
    currentPassword: yup.string().password(),
    newPassword: yup.string().password(),
    newPasswordConfirm: yup
      .string()
      .password()
      .oneOf([yup.ref('newPassword'), null], 'As senhas devem corresponder'),
  },
};

export { form };
