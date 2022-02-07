import theme from 'common/styles/theme';
import yup, { resolver } from 'common/util/yup';

const iconCommonProps = {
  color: theme.colors.primary,
  size: 20,
};

const form = {
  defaultValues: {
    email: '',
    password: '',
  },
  resolver: resolver({
    email: yup.string().trim().email().required(),
    password: yup.string().trim().required(),
  }),
};

export { iconCommonProps, form };
