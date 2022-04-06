import yup from 'common/util/yup';

const form = {
  defaultValues: {
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  },
  validations: {
    currentPassword: yup.string().trim().required(),
    newPassword: yup.string().trim().required(),
    newPasswordConfirm: yup
      .string()
      .trim()
      .required()
      .oneOf([yup.ref('newPassword'), null], 'As senhas devem corresponder'),
  },
};

export { form };
