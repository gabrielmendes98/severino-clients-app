import React from 'react';
import PropTypes from 'prop-types';

const List = ({
  data,
  keyExtractor,
  renderItem: Component,
  ListEmptyComponent,
}) => {
  if (data && data.length && Component) {
    return data.map((item, index) => (
      <Component key={keyExtractor(item)} item={item} index={index} />
    ));
  }

  if (ListEmptyComponent) {
    return ListEmptyComponent;
  }

  return null;
};

List.propTypes = {
  data: PropTypes.array,
  keyExtractor: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  ListEmptyComponent: PropTypes.node,
};

export default List;
