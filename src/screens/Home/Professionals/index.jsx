import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import Professional from './Professional';

const Professionals = ({ professionals }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {professionals.map(professional => (
      <Professional key={professional.id} professional={professional} />
    ))}
  </ScrollView>
);

Professionals.defaultProps = {
  professionals: [],
};

Professionals.propTypes = {
  professionals: PropTypes.array,
};

export default Professionals;
