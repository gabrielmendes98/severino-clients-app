import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import Container from 'components/Container';
import Checkbox from 'components/Checkbox';
import Text from 'components/Text';

const OrderByModal = ({
  options,
  renderButtons,
  setOrder,
  initialSelected,
}) => {
  const [selected, setSelected] = useState(initialSelected);

  const onSelect = name => checked => setSelected(checked ? name : null);

  const onConfirm = () => setOrder(selected);

  return (
    <Container>
      <Text margin={{ bottom: 2 }} size={1.5}>
        Ordenar Por
      </Text>

      <FlatList
        data={options}
        renderItem={({ item: { label, name } }) => (
          <Checkbox
            label={label}
            checked={selected === name}
            onValueChange={onSelect(name)}
          />
        )}
        keyExtractor={item => item.name}
      />

      {renderButtons([
        { label: 'Continuar', onPress: onConfirm },
        { label: 'Cancelar' },
      ])}
    </Container>
  );
};

OrderByModal.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  setOrder: PropTypes.func.isRequired,
  renderButtons: PropTypes.func.isRequired,
  initialSelected: PropTypes.string,
};

export default OrderByModal;
