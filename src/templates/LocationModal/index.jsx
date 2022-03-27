import React, { useState, useRef, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import debounce from 'lodash.debounce';
import locationsService from 'api/services/locations';
import theme from 'common/styles/theme';
import useLocation from 'common/contexts/Location/useLocation';
import toast from 'common/util/toast';
import Button from 'components/Button';
import Text from 'components/Text';
import Container from 'components/Container';
import styles, { selectedItemStyle, selectedItemTextColor } from './style';

const LocationModal = ({ closeModal }) => {
  const inputRef = useRef();
  const { location, saveLocation } = useLocation();
  const [inputValue, setInputValue] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [listOptions, setListOptions] = useState([]);

  const focusInput = () => inputRef.current.focus();

  const handleSave = () => {
    saveLocation(selectedLocation);
    toast.success('Localização alterada com sucesso.');
    closeModal();
  };

  const onChangeInput = useMemo(
    () =>
      debounce(value => {
        setInputValue(inputValue);
        if (value === '') {
          setListOptions([]);
          return;
        }
        locationsService.search(value).then(setListOptions);
      }, 300),
    [inputValue],
  );

  useEffect(
    () => () => {
      onChangeInput.cancel();
    },
    [onChangeInput],
  );

  return (
    <Container horizontalSpacing={false}>
      <Text
        color="primary"
        size={1.3}
        weight="bold"
        margin={{ bottom: 3 }}
        style={styles.wrapper}
      >{`Localização atual: ${
        location
          ? `${location.name}, ${location.state.acronym}`
          : 'Não slecionado'
      }`}</Text>

      <View style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={focusInput}>
          <View style={styles.inputContainer}>
            <FontAwesomeIcons
              color={theme.colors.grey}
              name="search"
              size={20}
            />

            <TextInput
              onChangeText={onChangeInput}
              placeholder="Digite o nome da sua cidade"
              ref={inputRef}
              style={styles.input}
              value={inputValue}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <FlatList
        data={listOptions}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedLocation(item)}
            style={[styles.listItem, selectedItemStyle(selectedLocation, item)]}
          >
            <Text
              color={selectedItemTextColor(selectedLocation, item)}
            >{`${item.name}, ${item.state.acronym}`}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.wrapper}>
        {Boolean(selectedLocation) && (
          <Button fullWidth onPress={handleSave} margin={{ top: 2 }}>
            Salvar
          </Button>
        )}

        <Button fullWidth onPress={closeModal} margin={{ top: 2 }}>
          Fechar
        </Button>
      </View>
    </Container>
  );
};

LocationModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default LocationModal;
