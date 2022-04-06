const parseParams = ({ order, ...other }) => {
  let params = {};

  if (order) {
    params = { ...params, sort: order };
  }

  return { ...params, ...other };
};

export { parseParams };
