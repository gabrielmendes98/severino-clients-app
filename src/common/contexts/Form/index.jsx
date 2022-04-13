import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { resolver } from 'common/util/yup';
import { Provider } from './context';

const Form = ({ defaultValues, validations, children }) => {
  const { control, handleSubmit, ...restForm } = useForm({
    defaultValues,
    resolver: resolver(validations),
  });

  const bag = {
    control,
    handleSubmit,
    ...restForm,
  };

  return <Provider value={bag}>{children(bag)}</Provider>;
};

Form.propTypes = {
  defaultValues: PropTypes.object.isRequired,
  validations: PropTypes.object,
  children: PropTypes.any,
};

export default Form;
