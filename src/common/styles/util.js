import theme from './theme';

const rgbToYIQ = ({ r, g, b }) => (r * 299 + g * 587 + b * 114) / 1000;

const hexToRgb = hex => {
  if (!hex) {
    return null;
  }

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const getContrast = (color, threshold = 128) => {
  const colorHex = getColor(color);

  if (colorHex === null) {
    return '#000';
  }

  const rgb = hexToRgb(colorHex);

  if (rgb === null) {
    return '#000';
  }

  return rgbToYIQ(rgb) >= threshold ? '#000' : '#fff';
};

const getColor = color => theme.colors[color] || theme.colors.primary;

const getTextColor = color =>
  theme.typography.colors[color] ||
  theme.colors[color] ||
  theme.typography.colors.main;

const marginHandler = ({ top = 0, right = 0, bottom = 0, left = 0 } = {}) => ({
  marginTop: theme.spacing(top),
  marginRight: theme.spacing(right),
  marginBottom: theme.spacing(bottom),
  marginLeft: theme.spacing(left),
});

export { getColor, getTextColor, marginHandler, getContrast };
