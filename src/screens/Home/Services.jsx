import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ServiceCard from 'templates/ServiceCard';
import HorizontalScroll from 'components/HorizontalScroll';

const Services = ({ services }) => (
  <HorizontalScroll>
    {services.map(({ name, id, serviceCategory }) => (
      <ServiceCard
        name={name}
        id={id}
        avatarUrl={serviceCategory?.avatarUrl}
        key={id}
      />
    ))}
  </HorizontalScroll>
);

Services.defaultProps = {
  services: [],
};

Services.propTypes = {
  services: PropTypes.array,
};

export default memo(Services);
