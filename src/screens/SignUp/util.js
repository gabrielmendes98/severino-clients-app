import theme from 'common/styles/theme';
import yup, { resolver } from 'common/util/yup';

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
  resolver: resolver(
    yup
      .object({
        name: yup.string().trim().required(),
        email: yup.string().trim().email().required(),
        password: yup.string().trim().required(),
      })
      .required(),
  ),
};

export { iconCommonProps, form };
