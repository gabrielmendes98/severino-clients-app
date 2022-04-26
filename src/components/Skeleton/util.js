import theme from 'common/styles/theme';

const generateItemsStyleWithProps = ({
  width,
  height,
  direction,
  spacing,
}) => ({
  width: theme.spacing(width),
  height: theme.spacing(height),
  marginRight: direction === 'row' ? theme.spacing(spacing) : 0,
  marginBottom: direction === 'column' ? theme.spacing(spacing) : 0,
});

export { generateItemsStyleWithProps };
