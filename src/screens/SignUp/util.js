import theme from 'common/styles/theme';
import yup from 'common/util/yup';

const iconCommonProps = {
  color: theme.colors.primary,
  size: 20,
};

const form = {
  defaultValues: {
    name: '',
    email: '',
    password: '',
  },
  validations: {
    name: yup.string().trim().required(),
    email: yup.string().trim().email().required(),
    password: yup.string().password(),
  },
};

export { iconCommonProps, form };
