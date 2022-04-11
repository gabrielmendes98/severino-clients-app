import React, { memo } from 'react';
import PropTypes from 'prop-types';
import HorizontalScroll from 'components/HorizontalScroll';
import Worker from './Worker';

const Workers = ({ workers }) => (
  <HorizontalScroll>
    {workers.map(worker => (
      <Worker key={worker.id} worker={worker} />
    ))}
  </HorizontalScroll>
);

Workers.defaultProps = {
  workers: [],
};

Workers.propTypes = {
  workers: PropTypes.array,
};

export default memo(Workers);
