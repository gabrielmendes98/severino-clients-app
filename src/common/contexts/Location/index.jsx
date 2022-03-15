import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getLocation,
  setLocation as setStorageLocation,
} from 'common/util/storage';

const LocationContext = createContext();
LocationContext.displayName = 'LocationContext';
const { Provider } = LocationContext;

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(true);

  const saveLocation = selectedLocation => {
    setLocation(selectedLocation);
    setStorageLocation(selectedLocation);
  };

  useEffect(() => {
    getLocation()
      .then(setLocation)
      .then(() => setLoading(false));
  }, []);

  return (
    <Provider value={{ location, saveLocation, loading }}>{children}</Provider>
  );
};

LocationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LocationContext };
export default LocationProvider;
