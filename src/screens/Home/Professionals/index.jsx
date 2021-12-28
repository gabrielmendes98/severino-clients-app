import React from 'react';
import PropTypes from 'prop-types';
import HorizontalScroll from 'components/Views/HorizontalScroll';
import Professional from './Professional';

const Professionals = ({ professionals }) => (
  <HorizontalScroll>
    {professionals.map(professional => (
      <Professional key={professional.id} professional={professional} />
    ))}
  </HorizontalScroll>
);

Professionals.defaultProps = {
  professionals: [],
};

Professionals.propTypes = {
  professionals: PropTypes.array,
};

export default Professionals;
