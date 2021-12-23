import theme from './theme';

const getColor = color =>
  theme.palette.common[color] ||
  theme.palette[color]?.main ||
  theme.palette.primary.main;

const getTextColor = color =>
  theme.typography.colors[color] ||
  theme.palette.common[color] ||
  theme.palette[color]?.main ||
  theme.typography.colors.main;

const marginHandler = ({ top = 0, right = 0, bottom = 0, left = 0 } = {}) => ({
  marginTop: theme.spacing(top),
  marginRight: theme.spacing(right),
  marginBottom: theme.spacing(bottom),
  marginLeft: theme.spacing(left),
});

export { getColor, getTextColor, marginHandler };
