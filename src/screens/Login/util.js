import theme from 'common/styles/theme';
import yup from 'common/util/yup';

const iconCommonProps = {
  color: theme.colors.primary,
  size: 20,
};

const form = {
  defaultValues: {
    email: '',
    password: '',
  },
  validations: {
    email: yup.string().trim().email().required(),
    password: yup.string().password(),
  },
};

export { iconCommonProps, form };
