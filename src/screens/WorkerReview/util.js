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

const throwError = () => {
  throw new Error('Selecione uma quantidade de estrelas para sua avaliação');
};

export { form, throwError };
