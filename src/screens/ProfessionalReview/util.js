import yup from 'common/util/yup';

const form = {
  defaultValues: {
    title: '',
    comment: '',
  },
  validations: {
    title: yup.string().trim().required(),
    comment: yup.string().trim().required(),
  },
};

export { form };
