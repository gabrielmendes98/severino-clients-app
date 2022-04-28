import React, { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  getLocation,
  setLocation as setStorageLocation,
} from 'common/util/storage';
import store from 'common/util/store';

const LocationContext = createContext();
LocationContext.displayName = 'LocationContext';
const { Provider } = LocationContext;

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(true);

  const saveLocation = useCallback(selectedLocation => {
    setLocation(selectedLocation);
    setStorageLocation(selectedLocation);
    store.setLocation(selectedLocation?.id);
  }, []);

  useEffect(() => {
    getLocation().then(storeLocation => {
      if (storeLocation) {
        setLocation(storeLocation);
        store.setLocation(storeLocation.id);
      }
      setLoading(false);
    });
  }, []);

  return (
    <Provider value={{ location, saveLocation, loading }}>{children}</Provider>
  );
};

LocationProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export { LocationContext, Provider };
export default LocationProvider;
